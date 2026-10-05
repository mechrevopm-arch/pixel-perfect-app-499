import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Briefcase, Copy, Heart, Home, MessageCircle, RotateCcw, Scale, Share2, Users, Sparkles, AlertCircle } from "lucide-react";
import { PageShell } from "@/components/SiteChrome";
import { ScoreBar } from "@/components/quiz";
import { calculate, isComplete } from "@/lib/mbti/scoring";
import { quiz, useQuiz } from "@/lib/mbti/store";
import { CATEGORY_CLASS, LETTER_INFO, TYPES } from "@/lib/mbti/types";

export const Route = createFileRoute("/result")({
  head: () => ({
    meta: [
      { title: "Your Personality Type — MindType" },
      { name: "description", content: "Your MindType result: your likely MBTI type, strengths, challenges, and career areas." },
      { property: "og:title", content: "My MindType Personality Result" },
      { property: "og:description", content: "See your likely MBTI type with a detailed breakdown." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ResultPage,
});

function ResultPage() {
  const { answers, hydrated } = useQuiz();
  const navigate = useNavigate();
  const complete = isComplete(answers);
  const result = useMemo(() => (complete ? calculate(answers) : null), [answers, complete]);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (hydrated && !complete) navigate({ to: "/test", replace: true });
  }, [hydrated, complete, navigate]);

  if (!result) return <PageShell><div className="py-40 text-center text-muted-foreground">Loading your result…</div></PageShell>;

  const t = TYPES[result.type]!;
  const shareText = `I just discovered my MBTI personality type: ${t.type} — The ${t.name}!`;

  const flash = (m: string) => { setToast(m); setTimeout(() => setToast(null), 2500); };
  const copy = async () => {
    try { await navigator.clipboard.writeText(shareText); flash("Result copied to clipboard"); }
    catch { flash("Couldn't copy — please copy manually"); }
  };
  const share = async () => {
    if (typeof navigator.share === "function") {
      try { await navigator.share({ title: "MindType", text: shareText, url: window.location.origin }); return; }
      catch (e) { if ((e as Error).name === "AbortError") return; }
    }
    copy();
  };
  const retake = () => { quiz.reset(); navigate({ to: "/test" }); };

  const details = [
    { icon: MessageCircle, title: "Communication Style", text: t.communicationStyle },
    { icon: Scale, title: "Decision-Making", text: t.decisionMaking },
    { icon: Briefcase, title: "Work Style", text: t.workStyle },
    { icon: Users, title: "Social Style", text: t.socialStyle },
    { icon: Heart, title: "Relationships", text: t.relationshipStyle },
  ];

  return (
    <PageShell>
      <div className="mx-auto max-w-5xl px-5 pt-6">
        <p className="animate-fade-up text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground">Your Personality Type</p>

        <section className="animate-pop-in relative mt-6 overflow-hidden rounded-3xl bg-brand p-8 text-center text-primary-foreground shadow-lift sm:p-14">
          <span className="inline-flex items-center gap-2 rounded-full bg-card/15 px-4 py-1.5 text-sm font-semibold">
            <span className={`h-2.5 w-2.5 rounded-full ${CATEGORY_CLASS[t.category]} ring-2 ring-primary-foreground/60`} aria-hidden />
            {t.category}
          </span>
          <h1 className="mt-6 text-7xl font-bold tracking-tight sm:text-9xl">{t.type}</h1>
          <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">The {t.name}</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg opacity-90">{t.description}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button type="button" onClick={share} className="btn-ghost"><Share2 className="h-4 w-4" /> Share My Result</button>
            <button type="button" onClick={copy} className="btn-ghost"><Copy className="h-4 w-4" /> Copy Result</button>
          </div>
        </section>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <section className="card-soft p-7">
            <h3 className="text-xl font-bold">Your Personality Breakdown</h3>
            <p className="mt-1 text-sm text-muted-foreground">Relative preference — your response tendency, not a precise measurement.</p>
            <div className="mt-6 space-y-6">
              {result.dimensions.map((d) => (
                <ScoreBar key={d.first} name={LETTER_INFO[d.winner].name} percent={d.percent} balanced={d.balanced} />
              ))}
            </div>
          </section>

          <section className="card-soft p-7">
            <h3 className="text-xl font-bold">What This Means</h3>
            <dl className="mt-6 space-y-5">
              {result.type.split("").map((l) => (
                <div key={l} className="flex gap-4">
                  <dt className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-soft font-display text-lg font-bold text-primary">{l}</dt>
                  <dd>
                    <p className="font-semibold">{LETTER_INFO[l].name}</p>
                    <p className="text-sm text-muted-foreground">{LETTER_INFO[l].text}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="card-soft p-7">
            <h3 className="flex items-center gap-2 text-xl font-bold"><Sparkles className="h-5 w-5 text-primary" /> Your Strengths</h3>
            <ul className="mt-5 flex flex-wrap gap-2">
              {t.strengths.map((s) => <li key={s} className="rounded-full bg-primary-soft px-4 py-2 text-sm font-semibold text-primary">{s}</li>)}
            </ul>
          </section>

          <section className="card-soft p-7">
            <h3 className="flex items-center gap-2 text-xl font-bold"><AlertCircle className="h-5 w-5 text-accent" /> Possible Challenges</h3>
            <ul className="mt-5 space-y-2.5">
              {t.weaknesses.map((w) => (
                <li key={w} className="flex gap-3 text-sm"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />{w}</li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {details.map(({ icon: Icon, title, text }) => (
            <div key={title} className="card-soft p-6">
              <Icon className="h-5 w-5 text-info" aria-hidden />
              <h4 className="mt-3 font-bold">{title}</h4>
              <p className="mt-1.5 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
          <div className="card-soft p-6">
            <Users className="h-5 w-5 text-info" aria-hidden />
            <h4 className="mt-3 font-bold">Example Personalities</h4>
            <p className="mt-1.5 text-sm text-muted-foreground">{t.examples.join(", ")}. Approximate examples only — not factual certainty.</p>
          </div>
        </section>

        <section className="card-soft mt-6 p-7">
          <h3 className="text-xl font-bold">Career Areas That May Suit You</h3>
          <ul className="mt-5 flex flex-wrap gap-2">
            {t.careerAreas.map((c) => <li key={c} className="rounded-xl border bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground">{c}</li>)}
          </ul>
          <p className="mt-5 text-xs text-muted-foreground">
            Personality type does not determine career success. Interests, skills, education, experience, and personal circumstances are also important.
          </p>
        </section>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={retake} className="btn-primary"><RotateCcw className="h-4 w-4" /> Take the Test Again</button>
          <Link to="/" className="btn-ghost"><Home className="h-4 w-4" /> Back to Home</Link>
        </div>
        <p className="mx-auto mt-8 max-w-xl text-center text-xs text-muted-foreground">
          This is an informational assessment inspired by the MBTI framework — an indication, not a professional psychological diagnosis.
        </p>
      </div>

      {toast && (
        <div role="status" className="animate-fade-up fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background shadow-lift">
          {toast}
        </div>
      )}
    </PageShell>
  );
}
