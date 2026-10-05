import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { SiteHeader } from "@/components/SiteChrome";
import { AnswerOption, ProgressBar } from "@/components/quiz";
import { LIKERT, QUESTIONS } from "@/lib/mbti/questions";
import { quiz, useQuiz } from "@/lib/mbti/store";

export const Route = createFileRoute("/test")({
  head: () => ({
    meta: [
      { title: "Take the Test — MindType" },
      { name: "description", content: "25 questions, one at a time. Find your likely MBTI personality type." },
      { property: "og:title", content: "Take the MindType Personality Test" },
      { property: "og:description", content: "Answer 25 questions to discover your likely MBTI type." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: TestPage,
});

function TestPage() {
  const { answers, index, hydrated } = useQuiz();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const q = QUESTIONS[index];
  const selected = answers[index];
  const isLast = index === QUESTIONS.length - 1;
  const progress = Math.round(((index + 1) / QUESTIONS.length) * 100);

  const next = () => {
    if (selected == null) return setError(true);
    setError(false);
    if (isLast) {
      const firstMissing = answers.findIndex((a) => a == null);
      if (firstMissing !== -1) return quiz.goTo(firstMissing);
      navigate({ to: "/result" });
    } else quiz.goTo(index + 1);
  };

  return (
    <div className="min-h-screen bg-hero">
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-5 pb-20 pt-6">
        <ProgressBar value={progress} label={`Question ${index + 1} of ${QUESTIONS.length}`} />

        <div key={index} className={`card-soft animate-fade-up mt-8 p-6 sm:p-10 ${hydrated ? "" : "opacity-0"}`}>
          <h1 id="q-text" className="text-2xl font-semibold leading-snug sm:text-3xl">{q.text}</h1>
          <div role="radiogroup" aria-labelledby="q-text" className="mt-8 space-y-3">
            {LIKERT.map((o) => (
              <AnswerOption
                key={o.value}
                label={o.label}
                value={o.value}
                selected={selected === o.value}
                onSelect={() => {
                  quiz.answer(index, o.value);
                  setError(false);
                }}
              />
            ))}
          </div>
          {error && (
            <p role="alert" className="mt-4 text-sm font-semibold text-destructive">
              Please select an answer before continuing.
            </p>
          )}
        </div>

        <div className="mt-6 flex items-center justify-between gap-3">
          <button type="button" className="btn-ghost" disabled={index === 0} onClick={() => { setError(false); quiz.goTo(index - 1); }}>
            <ArrowLeft className="h-4 w-4" /> Previous
          </button>
          <button type="button" className="btn-primary" aria-disabled={selected == null} onClick={next}
            style={selected == null ? { opacity: 0.45 } : undefined}>
            {isLast ? "See My Results" : "Next"} <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-10 text-center">
          <button type="button" onClick={() => { quiz.reset(); setError(false); }}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <RotateCcw className="h-4 w-4" /> Restart test
          </button>
        </div>
      </main>
    </div>
  );
}
