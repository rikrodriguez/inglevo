"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Bot, Mic, RotateCcw, Send, Square, TrendingUp, Volume2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AnswerInput } from "@/components/interview/answer-input";
import { FeedbackPanel } from "@/components/interview/feedback-panel";
import { ScenarioSelector } from "@/components/interview/scenario-selector";
import { interviewScenarios } from "@/data/interview-scenarios";
import { trackEvent } from "@/lib/analytics";
import type { CoachFeedback, Profile } from "@/types";

type ApiResponse = {
  source: "mock" | "openai";
  saved: boolean;
  saveError?: string | null;
  message: string;
} & CoachFeedback;

type ConversationResponse = {
  interviewerReply: string;
  followUpQuestion: string;
  source: "mock" | "openai";
  message: string;
};

type ConversationMessage = {
  id: string;
  role: "ai" | "user";
  content: string;
};

type Attempt = {
  id: string;
  answer: string;
  result: ApiResponse;
};

type VoiceMetrics = {
  durationSeconds: number;
  source: "voice";
};

function createInitialConversation(question: string): ConversationMessage[] {
  return [
    {
      id: "initial-question",
      role: "ai",
      content: question,
    },
  ];
}

function getCurrentTimeMs() {
  return Date.now();
}

const maxRecordingMs = 90_000;

export function InterviewTrainer({ profile }: { profile: Profile }) {
  const [scenarioId, setScenarioId] = useState(interviewScenarios[0].id);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [transcribing, setTranscribing] = useState(false);
  const [conversationLoading, setConversationLoading] = useState(false);
  const [recording, setRecording] = useState(false);
  const [inputMode, setInputMode] = useState<"write" | "speak">("write");
  const [transcript, setTranscript] = useState("");
  const [activeQuestion, setActiveQuestion] = useState(interviewScenarios[0].question);
  const [conversation, setConversation] = useState<ConversationMessage[]>(
    createInitialConversation(interviewScenarios[0].question)
  );
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [error, setError] = useState<string | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const shouldTranscribeRef = useRef(false);
  const recordingStartedAtRef = useRef<number | null>(null);
  const recordingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scenario = useMemo(
    () => interviewScenarios.find((item) => item.id === scenarioId) ?? interviewScenarios[0],
    [scenarioId]
  );

  useEffect(() => {
    return () => {
      clearRecordingTimeout();
      streamRef.current?.getTracks().forEach((track) => track.stop());
      if (typeof window !== "undefined") {
        window.speechSynthesis?.cancel();
      }
    };
  }, []);

  function clearRecordingTimeout() {
    if (recordingTimeoutRef.current) {
      clearTimeout(recordingTimeoutRef.current);
      recordingTimeoutRef.current = null;
    }
  }

  async function analyze(
    answerOverride?: string,
    questionOverride?: string,
    voiceMetrics?: VoiceMetrics
  ) {
    const answerToAnalyze = (answerOverride ?? answer).trim();
    const questionToAnalyze = questionOverride ?? scenario.question;

    if (answerToAnalyze.length < 8) {
      setError("Write or record a slightly longer answer before analyzing.");
      return null;
    }

    setLoading(true);
    setError(null);
    setResult(null);
    trackEvent("interview_started", {
      scenario: scenario.scenario,
      mode: voiceMetrics ? "voice" : inputMode,
      question: questionToAnalyze,
    });

    try {
      const response = await fetch("/api/coach-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scenario: scenario.scenario,
          question: questionToAnalyze,
          userAnswer: answerToAnalyze,
          userLevel: profile.english_level ?? "B1",
          userRole: profile.role ?? "Professional",
          userGoal: profile.main_goal ?? "Get a remote job",
          ...(voiceMetrics ? { voiceMetrics } : {}),
        }),
      });

      const data = (await response.json()) as Partial<ApiResponse> & {
        error?: string;
      };

      if (!response.ok) {
        setError(
          data.error ??
            "We could not analyze the answer. Add a little more and try again."
        );
        return null;
      }

      const feedbackData = data as ApiResponse;
      trackEvent("feedback_generated", {
        scenario: scenario.scenario,
        mode: voiceMetrics ? "voice" : inputMode,
        source: feedbackData.source,
        overall_score: feedbackData.overallScore,
        saved: feedbackData.saved,
      });
      if (feedbackData.saved) {
        trackEvent("practice_saved", {
          scenario: scenario.scenario,
          mode: voiceMetrics ? "voice" : inputMode,
          overall_score: feedbackData.overallScore,
        });
      }
      setAttempts((current) => [
        ...current,
        {
          id: `${Date.now()}`,
          answer: answerToAnalyze,
          result: feedbackData,
        },
      ]);
      setResult(feedbackData);
      return feedbackData;
    } catch {
      setError("No pudimos conectar con el coach. Intenta otra vez en unos segundos.");
      return null;
    } finally {
      setLoading(false);
    }
  }

  function retry() {
    if (recording && recorderRef.current?.state === "recording") {
      shouldTranscribeRef.current = false;
      recorderRef.current.stop();
    }

    streamRef.current?.getTracks().forEach((track) => track.stop());
    clearRecordingTimeout();
    recordingStartedAtRef.current = null;
    setRecording(false);
    setAnswer("");
    setTranscript("");
    setResult(null);
    setError(null);
  }

  function resetConversation(question: string) {
    setActiveQuestion(question);
    setConversation(createInitialConversation(question));
    setAnswer("");
    setTranscript("");
    setResult(null);
    setAttempts([]);
    setError(null);
    clearRecordingTimeout();
    recordingStartedAtRef.current = null;
  }

  async function startRecording() {
    setError(null);
    setResult(null);

    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
      setError("Your browser cannot record audio here. Use written mode for now.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = MediaRecorder.isTypeSupported("audio/webm")
        ? "audio/webm"
        : undefined;
      const recorder = new MediaRecorder(
        stream,
        mimeType ? { mimeType } : undefined
      );

      chunksRef.current = [];
      streamRef.current = stream;
      recorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        clearRecordingTimeout();
        if (!shouldTranscribeRef.current) {
          chunksRef.current = [];
          stream.getTracks().forEach((track) => track.stop());
          streamRef.current = null;
          recorderRef.current = null;
          recordingStartedAtRef.current = null;
          return;
        }

        const audioBlob = new Blob(chunksRef.current, {
          type: recorder.mimeType || "audio/webm",
        });

        stream.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
        recorderRef.current = null;
        void transcribeAudio(audioBlob);
      };

      recorder.start();
      shouldTranscribeRef.current = true;
      recordingStartedAtRef.current = getCurrentTimeMs();
      setRecording(true);
      recordingTimeoutRef.current = setTimeout(() => {
        if (recorderRef.current?.state === "recording") {
          shouldTranscribeRef.current = true;
          recorderRef.current.stop();
          setRecording(false);
          setError("Recording stopped automatically at 90 seconds to protect your privacy and costs.");
        }
      }, maxRecordingMs);
    } catch {
      setError(
        "We could not access the microphone. Check browser permissions or use written mode."
      );
    }
  }

  function stopRecording() {
    clearRecordingTimeout();
    if (recorderRef.current && recorderRef.current.state !== "inactive") {
      shouldTranscribeRef.current = true;
      recorderRef.current.stop();
    }

    streamRef.current?.getTracks().forEach((track) => track.stop());
    setRecording(false);
  }

  function speakText(text: string) {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.92;
    window.speechSynthesis.speak(utterance);
  }

  async function continueConversation(
    feedback: ApiResponse,
    spokenAnswer: string,
    question: string
  ) {
    setConversationLoading(true);

    try {
      const response = await fetch("/api/interview-conversation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scenario: scenario.scenario,
          currentQuestion: question,
          userAnswer: spokenAnswer,
          improvedAnswer: feedback.improvedAnswer,
          quickDiagnosis: feedback.quickDiagnosis,
          userLevel: profile.english_level ?? "B1",
          userRole: profile.role ?? "Professional",
          userGoal: profile.main_goal ?? "Get a remote job",
          turnCount: Math.max(1, Math.floor(conversation.length / 2) + 1),
        }),
      });

      const data = (await response.json()) as Partial<ConversationResponse>;

      if (!response.ok || !data.interviewerReply || !data.followUpQuestion) {
        setError(
          data.message ??
            "Your answer was evaluated, but we could not continue the conversation."
        );
        return;
      }

      const nextAiMessage = `${data.interviewerReply}\n\n${data.followUpQuestion}`;
      setConversation((items) => [
        ...items,
        {
          id: `ai-${Date.now()}`,
          role: "ai",
          content: nextAiMessage,
        },
      ]);
      setActiveQuestion(data.followUpQuestion);
      setAnswer("");
      setTranscript("");
      speakText(data.followUpQuestion);
    } catch {
      setError("Your answer was evaluated, but the conversation could not continue.");
    } finally {
      setConversationLoading(false);
    }
  }

  async function transcribeAudio(audioBlob: Blob) {
    setTranscribing(true);
    setError(null);
    const questionForThisTurn = activeQuestion;
    const durationSeconds = recordingStartedAtRef.current
      ? Math.max(
          1,
          Math.round((getCurrentTimeMs() - recordingStartedAtRef.current) / 1000)
        )
      : 1;

    try {
      const formData = new FormData();
      const extension = audioBlob.type.includes("mp4") ? "mp4" : "webm";
      formData.append("audio", audioBlob, `answer.${extension}`);

      const response = await fetch("/api/transcribe", {
        method: "POST",
        body: formData,
      });
      const data = (await response.json()) as {
        transcript?: string;
        error?: string;
      };

      if (!response.ok || !data.transcript) {
        setError(
          data.error ??
            "We could not transcribe your answer. Try again or use text."
        );
        return;
      }

      const spokenTranscript = data.transcript;
      setTranscript(spokenTranscript);
      setAnswer(spokenTranscript);
      setConversation((items) => [
        ...items,
        {
          id: `user-${Date.now()}`,
          role: "user",
          content: spokenTranscript,
        },
      ]);
      const feedback = await analyze(spokenTranscript, questionForThisTurn, {
        durationSeconds,
        source: "voice",
      });

      if (feedback) {
        await continueConversation(feedback, spokenTranscript, questionForThisTurn);
      }
    } catch {
      setError("No pudimos enviar el audio. Intenta de nuevo o usa texto.");
    } finally {
      setTranscribing(false);
      recordingStartedAtRef.current = null;
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[320px_1fr_280px]">
      <ScenarioSelector
        scenarios={interviewScenarios}
        selectedId={scenarioId}
        onSelect={(id) => {
          const nextScenario =
            interviewScenarios.find((item) => item.id === id) ?? interviewScenarios[0];
          setScenarioId(id);
          resetConversation(nextScenario.question);
        }}
      />

      <section className="grid gap-6">
        <div className="premium-panel">
          <p className="section-kicker">Pregunta</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            {inputMode === "speak" ? activeQuestion : scenario.question}
          </h1>
          <p className="mt-3 text-muted-foreground">{scenario.goal}</p>
          {!result ? (
            <div className="mt-5 rounded-xl border border-dashed border-border bg-muted/40 p-4 text-sm text-muted-foreground">
              Tip: responde en 4 a 6 frases. Abre con tu rol, agrega evidencia
              concreta y cierra con el tipo de oportunidad remota que buscas.
            </div>
          ) : null}
          <div className="mt-6 inline-flex rounded-xl border border-border bg-muted p-1">
            <button
              type="button"
              onClick={() => setInputMode("write")}
              className={`rounded-lg px-3 py-2 text-sm font-medium ${
                inputMode === "write" ? "bg-white shadow-sm" : "text-muted-foreground"
              }`}
            >
              Write answer
            </button>
            <button
              type="button"
              onClick={() => setInputMode("speak")}
              className={`rounded-lg px-3 py-2 text-sm font-medium ${
                inputMode === "speak" ? "bg-white shadow-sm" : "text-muted-foreground"
              }`}
            >
              Speak with AI
            </button>
          </div>

          {inputMode === "write" ? (
            <AnswerInput value={answer} onChange={setAnswer} />
          ) : (
            <div className="mt-6 rounded-2xl border border-border/80 bg-muted/40 p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-medium">AI interview conversation</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Speak with Inglevo like a real interview. The AI listens to
                    your answer, evaluates it and asks a follow-up question. We
                    do not store the audio.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => speakText(activeQuestion)}
                    disabled={recording || transcribing || loading}
                  >
                    Listen
                    <Volume2 />
                  </Button>
                  <Button
                    type="button"
                    variant={recording ? "destructive" : "default"}
                    onClick={recording ? stopRecording : startRecording}
                    disabled={loading || transcribing || conversationLoading}
                  >
                    {recording ? (
                      <>
                        Stop
                        <Square />
                      </>
                    ) : (
                      <>
                        Speak
                        <Mic />
                      </>
                    )}
                  </Button>
                </div>
              </div>
              <div className="mt-5 grid gap-3">
                {conversation.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "border border-border bg-white text-foreground"
                      }`}
                    >
                      {message.role === "ai" ? (
                        <div className="mb-1 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                          <Bot className="size-3.5" />
                          AI interviewer
                        </div>
                      ) : null}
                      {message.content.split("\n").map((line, index) => (
                        <p key={`${message.id}-${index}`} className={line ? "" : "h-2"}>
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {recording ? (
                <p className="mt-3 text-sm text-black">
                  Recording... answer as if you were in a real interview.
                </p>
              ) : null}
              {transcribing ? (
                <p className="mt-3 text-sm text-muted-foreground">
                  Transcribing your answer and preserving your wording...
                </p>
              ) : null}
              {loading ? (
                <p className="mt-3 text-sm text-muted-foreground">
                  Checking clarity, structure, professional tone and readiness...
                </p>
              ) : null}
              {conversationLoading ? (
                <p className="mt-3 text-sm text-muted-foreground">
                  The AI interviewer is preparing the next question...
                </p>
              ) : null}
              {transcript ? (
                <div className="mt-4 rounded-xl border border-border bg-white p-4">
                  <p className="text-sm font-medium text-muted-foreground">
                    Transcript
                  </p>
                  <p className="mt-2 leading-7">{transcript}</p>
                </div>
              ) : null}
            </div>
          )}
          {error ? <p className="mt-3 text-sm text-black">{error}</p> : null}
          <div className="mt-5 flex flex-wrap gap-3">
            <Button
              onClick={() => analyze()}
              disabled={
                loading ||
                transcribing ||
                conversationLoading ||
                answer.trim().length < 8
              }
            >
              {loading ? "Preparing improved version..." : "Analyze readiness"}
              <Send />
            </Button>
            <Button variant="outline" onClick={retry}>
              Try again
              <RotateCcw />
            </Button>
          </div>
          {result && result.overallScore < 75 ? (
            <div className="mt-4 rounded-xl border border-[#dfdbd6] bg-[#dfdbd6] p-4 text-sm text-black">
              <p className="font-medium">Recommended repeat</p>
              <p className="mt-1">
                Your score is under 75. Try again once using the improved answer
                structure, but keep it natural and in your own words.
              </p>
            </div>
          ) : null}
        </div>

        {attempts.length >= 2 ? (
          <RepeatComparison
            previous={attempts[attempts.length - 2]}
            current={attempts[attempts.length - 1]}
          />
        ) : attempts.length === 1 ? (
          <FirstAttemptSummary attempt={attempts[0]} />
        ) : null}

        {result ? (
          <FeedbackPanel result={result} source={result.source} message={result.message} />
        ) : null}
      </section>

      <aside className="grid h-fit gap-4 xl:sticky xl:top-24">
        <div className="premium-card p-5">
          <p className="section-kicker">What we evaluate</p>
          <div className="mt-4 grid gap-3">
            {[
              ["Clarity", "Can a recruiter understand you quickly?"],
              ["Structure", "Do you answer with context, action and result?"],
              ["Professional tone", "Do you sound calm, credible and ready?"],
              ["Remote readiness", "Does this fit international remote work?"],
            ].map(([label, copy]) => (
              <div key={label} className="assessment-row">
                <p className="font-medium">{label}</p>
                <p className="mt-1 text-sm text-muted-foreground">{copy}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-[#d0f5e3] bg-[#d0f5e3] p-5 text-sm text-black">
          <p className="font-semibold">Goal</p>
          <p className="mt-2">
            We are not looking for perfect English. We are looking for an answer
            that sounds clear, professional and ready for a real conversation.
          </p>
        </div>
      </aside>
    </div>
  );
}

function FirstAttemptSummary({ attempt }: { attempt: Attempt }) {
  return (
    <section className="premium-panel">
      <div className="flex items-center gap-2">
        <TrendingUp className="size-5 text-black" />
        <h2 className="text-xl font-semibold">Attempt 1 saved</h2>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        Score: {attempt.result.overallScore}/100. Use Try again to create a second
        attempt and compare your improvement.
      </p>
    </section>
  );
}

function RepeatComparison({
  previous,
  current,
}: {
  previous: Attempt;
  current: Attempt;
}) {
  const delta = current.result.overallScore - previous.result.overallScore;
  const scoreDeltas = [
    ["Clarity", current.result.clarity - previous.result.clarity],
    ["Grammar", current.result.grammar - previous.result.grammar],
    [
      "Professional tone",
      current.result.professionalTone - previous.result.professionalTone,
    ],
    ["Structure", current.result.structure - previous.result.structure],
    [
      "Readiness",
      current.result.opportunityReadiness - previous.result.opportunityReadiness,
    ],
  ];

  return (
    <section className="premium-panel">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Repeat Mode</p>
          <h2 className="mt-1 text-2xl font-semibold">
            Attempt {delta >= 0 ? "improved" : "changed"} by {delta >= 0 ? "+" : ""}
            {delta} points
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Attempt 1: {previous.result.overallScore}/100 · Latest attempt:{" "}
            {current.result.overallScore}/100
          </p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-sm ${
            delta >= 0
              ? "bg-[#d0f5e3] text-black"
              : "bg-[#dfdbd6] text-black"
          }`}
        >
          {delta >= 0 ? "Improving" : "Needs another repeat"}
        </span>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-5">
        {scoreDeltas.map(([label, value]) => (
          <div key={label} className="rounded-xl border border-border bg-muted/40 p-3">
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="mt-1 text-lg font-semibold">
              {Number(value) >= 0 ? "+" : ""}
              {value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-border p-4">
          <p className="font-medium">What changed</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Before: {previous.result.whatToImprove[0] ?? previous.result.quickDiagnosis}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Now: {current.result.whatWorked[0] ?? current.result.quickDiagnosis}
          </p>
        </div>
        <div className="rounded-xl border border-border p-4">
          <p className="font-medium">Next repeat focus</p>
          <p className="mt-2 text-sm text-muted-foreground">
            {current.result.overallScore < 75
              ? current.result.whatToImprove[0] ??
                "Repeat once more with clearer structure and stronger examples."
              : "You crossed the 75 readiness threshold. Save this answer to your Answer Bank or practice it out loud."}
          </p>
        </div>
      </div>
    </section>
  );
}
