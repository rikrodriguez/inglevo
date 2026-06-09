"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Bot,
  Check,
  Mic,
  RotateCcw,
  Save,
  Send,
  Square,
  TrendingUp,
  Volume2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { AnswerInput } from "@/components/interview/answer-input";
import { FeedbackPanel } from "@/components/interview/feedback-panel";
import { ScenarioSelector } from "@/components/interview/scenario-selector";
import { meetingSimulationScenarios } from "@/data/ai-tutor-modules";
import { interviewScenarios } from "@/data/interview-scenarios";
import { trackEvent } from "@/lib/analytics";
import type { CoachFeedback, PracticeSession, Profile } from "@/types";

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

export function InterviewTrainer({
  profile,
  initialInputMode = "write",
  initialVoicePracticeType = "speaking",
  previousSessions = [],
  freePracticeLimit,
}: {
  profile: Profile;
  initialInputMode?: "write" | "speak";
  initialVoicePracticeType?: "speaking" | "meeting";
  previousSessions?: PracticeSession[];
  freePracticeLimit?: number;
}) {
  const initialQuestion =
    initialInputMode === "speak" && initialVoicePracticeType === "meeting"
      ? meetingSimulationScenarios[0].prompt
      : interviewScenarios[0].question;
  const [scenarioId, setScenarioId] = useState(interviewScenarios[0].id);
  const [meetingScenarioId, setMeetingScenarioId] = useState(
    meetingSimulationScenarios[0].id
  );
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [transcribing, setTranscribing] = useState(false);
  const [conversationLoading, setConversationLoading] = useState(false);
  const [recording, setRecording] = useState(false);
  const [inputMode, setInputMode] = useState<"write" | "speak">(initialInputMode);
  const [voicePracticeType, setVoicePracticeType] = useState<"speaking" | "meeting">(
    initialVoicePracticeType
  );
  const [transcript, setTranscript] = useState("");
  const [activeQuestion, setActiveQuestion] = useState(initialQuestion);
  const [conversation, setConversation] = useState<ConversationMessage[]>(
    createInitialConversation(initialQuestion)
  );
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [savingAsset, setSavingAsset] = useState(false);
  const [assetSaved, setAssetSaved] = useState(false);
  const [assetError, setAssetError] = useState<string | null>(null);
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
  const meetingScenario = useMemo(
    () =>
      meetingSimulationScenarios.find((item) => item.id === meetingScenarioId) ??
      meetingSimulationScenarios[0],
    [meetingScenarioId]
  );
  const currentScenarioName =
    inputMode === "speak" && voicePracticeType === "meeting"
      ? `Meeting Simulation: ${meetingScenario.label}`
      : scenario.scenario;
  const sessionGoal =
    inputMode === "speak" && voicePracticeType === "meeting"
      ? meetingScenario.prompt
      : inputMode === "speak"
        ? "Improve delivery, pace, filler words, confidence markers and spoken structure without storing audio."
        : scenario.goal;
  const scenarioHistory = useMemo(() => {
    const target = currentScenarioName.toLowerCase();

    return previousSessions.filter((session) => {
      const savedScenario = session.scenario.toLowerCase();

      return savedScenario === target || savedScenario.includes(target);
    });
  }, [currentScenarioName, previousSessions]);
  const bestScenarioScore = scenarioHistory.reduce<number | null>(
    (best, session) => {
      if (typeof session.overall_score !== "number") {
        return best;
      }

      return best === null ? session.overall_score : Math.max(best, session.overall_score);
    },
    null
  );
  const latestScenarioScore =
    typeof scenarioHistory[0]?.overall_score === "number"
      ? scenarioHistory[0].overall_score
      : null;
  const practicesRemaining =
    typeof freePracticeLimit === "number"
      ? Math.max(0, freePracticeLimit - previousSessions.length)
      : null;

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
    voiceMetrics?: VoiceMetrics,
    scenarioOverride?: string
  ) {
    const answerToAnalyze = (answerOverride ?? answer).trim();
    const questionToAnalyze = questionOverride ?? scenario.question;
    const scenarioToAnalyze = scenarioOverride ?? currentScenarioName;

    if (answerToAnalyze.length < 8) {
      setError("Write or record a slightly longer answer before analyzing.");
      return null;
    }

    setLoading(true);
    setError(null);
    setAssetError(null);
    setAssetSaved(false);
    setResult(null);
    trackEvent("interview_started", {
      scenario: scenarioToAnalyze,
      mode: voiceMetrics ? "voice" : inputMode,
      question: questionToAnalyze,
    });

    try {
      const response = await fetch("/api/coach-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scenario: scenarioToAnalyze,
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
        scenario: scenarioToAnalyze,
        mode: voiceMetrics ? "voice" : inputMode,
        source: feedbackData.source,
        overall_score: feedbackData.overallScore,
        saved: feedbackData.saved,
      });
      if (feedbackData.saved) {
        trackEvent("practice_saved", {
          scenario: scenarioToAnalyze,
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
    setAssetError(null);
    setAssetSaved(false);
  }

  function resetConversation(question: string) {
    setActiveQuestion(question);
    setConversation(createInitialConversation(question));
    setAnswer("");
    setTranscript("");
    setResult(null);
    setAttempts([]);
    setError(null);
    setAssetError(null);
    setAssetSaved(false);
    clearRecordingTimeout();
    recordingStartedAtRef.current = null;
  }

  async function saveImprovedAnswerAsset() {
    if (!result?.improvedAnswer) {
      return;
    }

    setSavingAsset(true);
    setAssetError(null);

    try {
      const sourceAnswer = attempts[attempts.length - 1]?.answer ?? answer;
      const sourceQuestion = inputMode === "speak" ? activeQuestion : scenario.question;
      const response = await fetch("/api/remote-job-assets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assetType: "interview_answer",
          userRole: profile.role ?? "Professional",
          userGoal: profile.main_goal ?? "Get a remote job",
          directTitle: `${currentScenarioName} - improved answer`,
          directContent: result.improvedAnswer,
          directRationale:
            "Saved exactly from the improved answer in AI Trainer so the candidate can rehearse it and reuse it without losing the strongest wording.",
          directTips: [
            "Practice it out loud until it sounds natural.",
            "Keep the examples accurate to your real experience.",
            "Adapt the final sentence to each role before using it.",
          ],
          inputContext: `Scenario: ${currentScenarioName}
Question: ${sourceQuestion}

Original answer:
${sourceAnswer}

Improved answer:
${result.improvedAnswer}

Save this exact improved version as a reusable Inglevo interview answer asset for a LATAM professional applying to US remote jobs.`,
        }),
      });
      const data = (await response.json()) as {
        saved?: boolean;
        message?: string;
        error?: string;
      };

      if (!response.ok || !data.saved) {
        setAssetError(
          data.error ??
            data.message ??
            "We could not save this answer as a job asset yet."
        );
        return;
      }

      setAssetSaved(true);
      trackEvent("asset_created", {
        asset_type: "interview_answer",
        source: result.source,
        saved: true,
      });
    } catch {
      setAssetError("No pudimos guardar el asset. Intenta otra vez.");
    } finally {
      setSavingAsset(false);
    }
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
    question: string,
    scenarioName: string
  ) {
    setConversationLoading(true);

    try {
      const response = await fetch("/api/interview-conversation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scenario: scenarioName,
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
    const scenarioForThisTurn = currentScenarioName;
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
      }, scenarioForThisTurn);

      if (feedback) {
        await continueConversation(
          feedback,
          spokenTranscript,
          questionForThisTurn,
          scenarioForThisTurn
        );
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
          if (voicePracticeType === "speaking") {
            resetConversation(nextScenario.question);
          }
        }}
      />

      <section className="grid gap-6">
        <div className="premium-panel">
          <p className="section-kicker">
            {inputMode === "speak" && voicePracticeType === "meeting"
              ? "Meeting Simulation"
              : "Training Session"}
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            {inputMode === "speak" ? activeQuestion : scenario.question}
          </h1>
          <div className="mt-4 rounded-xl border border-[#d0f5e3] bg-[#d0f5e3]/70 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Session goal
            </p>
            <p className="mt-1 text-sm leading-6 text-black">{sessionGoal}</p>
          </div>
          <div className="mt-4 grid gap-3 rounded-xl border border-border bg-white p-4 text-sm sm:grid-cols-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Scenario evidence
              </p>
              <p className="mt-1 font-medium">
                {scenarioHistory.length
                  ? `${scenarioHistory.length} saved ${scenarioHistory.length === 1 ? "practice" : "practices"}`
                  : "No saved practice yet"}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Best scenario score
              </p>
              <p className="mt-1 font-medium">
                {bestScenarioScore === null ? "Not yet" : `${bestScenarioScore}/100`}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Practice room
              </p>
              <p className="mt-1 font-medium">
                {practicesRemaining === null
                  ? `${previousSessions.length} total practices`
                  : `${practicesRemaining} free ${practicesRemaining === 1 ? "practice" : "practices"} left`}
              </p>
              {latestScenarioScore !== null ? (
                <p className="mt-1 text-xs text-muted-foreground">
                  Latest: {latestScenarioScore}/100
                </p>
              ) : null}
            </div>
          </div>
          {!result ? (
            <div className="mt-5 rounded-xl border border-dashed border-border bg-muted/40 p-4 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Answer scaffold</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                <p>
                  <span className="font-semibold text-foreground">Role:</span>{" "}
                  say what you do and who you help.
                </p>
                <p>
                  <span className="font-semibold text-foreground">Evidence:</span>{" "}
                  mention one real project, metric or responsibility.
                </p>
                <p>
                  <span className="font-semibold text-foreground">Result:</span>{" "}
                  explain the outcome or business value.
                </p>
                <p>
                  <span className="font-semibold text-foreground">Remote fit:</span>{" "}
                  show clear communication, ownership or async habits.
                </p>
              </div>
            </div>
          ) : null}
          <div className="mt-6 inline-flex rounded-xl border border-border bg-muted p-1">
            <button
              type="button"
              onClick={() => {
                setInputMode("write");
                resetConversation(scenario.question);
              }}
              className={`rounded-lg px-3 py-2 text-sm font-medium ${
                inputMode === "write" ? "bg-white shadow-sm" : "text-muted-foreground"
              }`}
            >
              Write answer
            </button>
            <button
              type="button"
              onClick={() => {
                setInputMode("speak");
                resetConversation(
                  voicePracticeType === "meeting"
                    ? meetingScenario.prompt
                    : scenario.question
                );
              }}
              className={`rounded-lg px-3 py-2 text-sm font-medium ${
                inputMode === "speak" ? "bg-white shadow-sm" : "text-muted-foreground"
              }`}
            >
              Speaking Confidence
            </button>
          </div>

          {inputMode === "write" ? (
            <AnswerInput value={answer} onChange={setAnswer} />
          ) : (
            <div className="mt-6 rounded-2xl border border-border/80 bg-muted/40 p-4">
              <div className="mb-5 grid gap-2 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => {
                    setVoicePracticeType("speaking");
                    resetConversation(scenario.question);
                  }}
                  className={`rounded-xl border p-3 text-left text-sm transition ${
                    voicePracticeType === "speaking"
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-white hover:bg-muted"
                  }`}
                >
                  <span className="font-semibold">Speaking Confidence</span>
                  <span className="mt-1 block text-xs opacity-75">
                    Delivery, pace, filler words and spoken structure.
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setVoicePracticeType("meeting");
                    resetConversation(meetingScenario.prompt);
                  }}
                  className={`rounded-xl border p-3 text-left text-sm transition ${
                    voicePracticeType === "meeting"
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-white hover:bg-muted"
                  }`}
                >
                  <span className="font-semibold">Meeting Simulations</span>
                  <span className="mt-1 block text-xs opacity-75">
                    Standups, blockers, client calls and salary conversations.
                  </span>
                </button>
              </div>
              {voicePracticeType === "meeting" ? (
                <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
                  {meetingSimulationScenarios.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setMeetingScenarioId(item.id);
                        resetConversation(item.prompt);
                      }}
                      className={`shrink-0 rounded-full border px-3 py-2 text-sm transition ${
                        item.id === meetingScenarioId
                          ? "border-foreground bg-foreground text-background"
                          : "border-border bg-white hover:bg-muted"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              ) : null}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-medium">
                    {voicePracticeType === "meeting"
                      ? "AI meeting simulation"
                      : "AI speaking confidence practice"}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Speak with Inglevo like a real remote-work conversation.
                    The AI evaluates the transcript and asks a follow-up. We do
                    not store the audio.
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
                  Checking clarity, delivery, structure, professional tone and readiness...
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
              onClick={() =>
                analyze(
                  undefined,
                  inputMode === "speak" ? activeQuestion : scenario.question,
                  undefined,
                  currentScenarioName
                )
              }
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
          {result ? (
            <div className="mt-4 rounded-xl border border-border bg-muted/30 p-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-semibold">Turn this into a job asset</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Save your strongest answer so it can support applications
                    and your Inglevo Verification Profile.
                  </p>
                </div>
                <Button
                  type="button"
                  onClick={saveImprovedAnswerAsset}
                  disabled={savingAsset || assetSaved}
                >
                  {savingAsset
                    ? "Saving..."
                    : assetSaved
                      ? "Saved as asset"
                      : "Save strongest answer"}
                  {assetSaved ? <Check /> : <Save />}
                </Button>
              </div>
              {assetError ? (
                <p className="mt-3 text-sm text-black">{assetError}</p>
              ) : null}
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
        <h2 className="text-xl font-semibold">Attempt 1 → Improved Answer</h2>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        Score: {attempt.result.overallScore}/100. Use the improved version,
        practice again and create Attempt 2 to see your score delta.
      </p>
      <div className="mt-4 grid gap-3 rounded-xl border border-border bg-muted/30 p-4 text-sm md:grid-cols-3">
        <p>
          <span className="font-semibold">1. Attempt 1</span>
          <br />
          Baseline answer saved.
        </p>
        <p>
          <span className="font-semibold">2. Improved Answer</span>
          <br />
          Use the stronger structure.
        </p>
        <p>
          <span className="font-semibold">3. Attempt 2</span>
          <br />
          Repeat to increase your score.
        </p>
      </div>
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
          <p className="text-sm font-medium text-muted-foreground">
            Attempt 1 → Improved Answer → Attempt 2 → Score Delta
          </p>
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
