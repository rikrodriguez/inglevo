import { ImprovedAnswerCard } from "@/components/interview/improved-answer-card";
import { KeyPhrases } from "@/components/interview/key-phrases";
import { ScoreBreakdown } from "@/components/interview/score-breakdown";
import type { CoachFeedback } from "@/types";

export function FeedbackPanel({
  result,
  source,
  message,
}: {
  result: CoachFeedback;
  source: "mock" | "openai";
  message: string;
}) {
  const voiceFeedback = result.voiceFeedback;
  const careerSignals = [
    ["Employability", result.employability, result.employabilityFeedback],
    ["Remote readiness", result.remoteReadiness, result.remoteReadinessFeedback],
    ["Professional tone", result.professionalTone, result.professionalToneFeedback],
    ["Confidence", result.confidence, result.confidenceFeedback],
    ["Specificity", result.specificity, result.specificityFeedback],
    ["Does it sell you?", result.sellsYou, result.sellsYouFeedback],
  ] as const;

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
      <div className="premium-panel">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-black">Your main asset</p>
            <h2 className="text-2xl font-semibold">Improved answer</h2>
          </div>
          <span className="rounded-full bg-[#d0f5e3] px-3 py-1 text-sm text-black">
            {source === "openai" ? "AI feedback" : "Mock feedback"}
          </span>
        </div>
        <div className="mt-4 grid gap-4">
          <ImprovedAnswerCard
            label="Clear version"
            answer={result.improvedAnswers.clearVersion}
          />
          <ImprovedAnswerCard
            label="Professional version"
            answer={result.improvedAnswers.professionalVersion}
          />
          <ImprovedAnswerCard
            label="High-value version"
            answer={result.improvedAnswers.highValueVersion}
          />
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Start with the clear version, practice the professional version and
          use the high-value version when you can support it with real examples.
        </p>
        <h3 className="mt-6 font-semibold">Quick diagnosis</h3>
        <p className="mt-2 text-muted-foreground">{result.quickDiagnosis}</p>
        <h3 className="mt-6 font-semibold">Career readiness feedback</h3>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {careerSignals.map(([label, score, feedback]) => (
            <div key={label} className="rounded-xl border border-border bg-muted/40 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-medium">{label}</p>
                <span className="rounded-full bg-white px-3 py-1 text-sm">
                  {score}/100
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{feedback}</p>
            </div>
          ))}
        </div>
        {voiceFeedback ? (
          <div className="mt-6 rounded-2xl border border-[#dfdbd6] bg-[#dfdbd6]/70 p-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-medium text-black">
                  Voice-specific feedback
                </p>
                <h3 className="mt-1 text-lg font-semibold">
                  How your spoken answer sounded
                </h3>
              </div>
              <span className="rounded-full bg-white px-3 py-1 text-sm text-black">
                {voiceFeedback.speakingSpeedWpm} WPM
              </span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              {voiceFeedback.summary}
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <VoiceSignal
                label="Answer length"
                value={`${voiceFeedback.durationSeconds}s · ${voiceFeedback.wordCount} words`}
                detail={voiceFeedback.answerLength}
              />
              <VoiceSignal
                label="Pauses / pace"
                value={`${voiceFeedback.speakingSpeedWpm} words per minute`}
                detail={voiceFeedback.estimatedPauses}
              />
              <VoiceSignal
                label="Filler words"
                value={
                  voiceFeedback.fillerWordCount > 0
                    ? `${voiceFeedback.fillerWordCount} detected`
                    : "None detected"
                }
                detail={
                  voiceFeedback.fillerWords.length > 0
                    ? voiceFeedback.fillerWords.join(", ")
                    : "Good control of filler words."
                }
              />
              <VoiceSignal
                label="Confidence markers"
                value={
                  voiceFeedback.confidenceMarkers.length > 0
                    ? voiceFeedback.confidenceMarkers.join(", ")
                    : "No weak markers detected"
                }
                detail="Reduce words like maybe, just or sorry when you need to sound decisive."
              />
              <VoiceSignal
                label="Repetitions"
                value={
                  voiceFeedback.repetitions.length > 0
                    ? voiceFeedback.repetitions.join(", ")
                    : "No repeated words detected"
                }
                detail="Repeated words can make an answer sound less prepared."
              />
              <VoiceSignal
                label="Spoken structure"
                value="Structure"
                detail={voiceFeedback.spokenStructure}
              />
              <VoiceSignal
                label="Transcript quality"
                value="Transcript"
                detail={voiceFeedback.transcriptQuality}
              />
            </div>
          </div>
        ) : null}
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div>
            <h3 className="font-semibold">What worked</h3>
            <ul className="mt-2 grid gap-2 text-sm text-muted-foreground">
              {result.whatWorked.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">What to improve</h3>
            <ul className="mt-2 grid gap-2 text-sm text-muted-foreground">
              {result.whatToImprove.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
        <h3 className="mt-6 font-semibold">Key phrases</h3>
        <KeyPhrases phrases={result.keyPhrases} />
        <h3 className="mt-6 font-semibold">Next practice</h3>
        <p className="mt-2 text-muted-foreground">{result.nextPractice}</p>
        <p className="mt-5 text-sm text-muted-foreground">{message}</p>
      </div>
      <div className="premium-panel">
        <h2 className="text-xl font-semibold">Scores</h2>
        <ScoreBreakdown
          scores={[
            ["Overall", result.overallScore],
            ["Clarity", result.clarity],
            ["Grammar", result.grammar],
            ["Professional tone", result.professionalTone],
            ["Structure", result.structure],
            ["Readiness", result.opportunityReadiness],
            ["Employability", result.employability],
            ["Confidence", result.confidence],
            ["Specificity", result.specificity],
            ["Sells you", result.sellsYou],
          ]}
        />
      </div>
    </div>
  );
}

function VoiceSignal({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-xl border border-white/80 bg-white p-4">
      <p className="text-xs font-medium uppercase text-muted-foreground">{label}</p>
      <p className="mt-1 font-semibold">{value}</p>
      <p className="mt-2 text-sm text-muted-foreground">{detail}</p>
    </div>
  );
}
