import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, ListChecks, Shapes, UserX } from "lucide-react";
import { PageShell } from "@/components/SiteChrome";
import { TYPES, CATEGORY_CLASS, type Category } from "@/lib/mbti/types";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MindType — MBTI Personality Test" },
      { name: "description", content: "Answer 25 simple questions and discover your likely MBTI personality type. Free, no account required." },
      { property: "og:title", content: "MindType — MBTI Personality Test" },
      { property: "og:description", content: "Discover the way your mind works with a free 25-question MBTI-inspired test." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const FACTS = [
  { icon: ListChecks, label: "25 Questions" },
  { icon: Clock, label: "About 5–7 Minutes" },
  { icon: Shapes, label: "16 Possible Types" },
  { icon: UserX, label: "No Account Required" },
];

const CATS: Category[] = ["Analyst", "Diplomat", "Sentinel", "Explorer"];

function Index() {
  return (
    <PageShell>
      <section className="mx-auto max-w-4xl px-5 pb-16 pt-12 text-center sm:pt-20">
        <p className="animate-fade-up inline-block rounded-full border bg-card px-4 py-1.5 text-sm font-medium text-muted-foreground">
          Discover the way your mind works.
        </p>
        <h1 className="animate-fade-up mt-6 text-5xl font-bold leading-[1.05] sm:text-7xl">
          What's Your <span className="text-gradient">Personality Type?</span>
        </h1>
        <p className="animate-fade-up mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
          Answer 25 simple questions and discover your likely MBTI personality type.
        </p>
        <div className="animate-fade-up mt-10">
          <Link to="/test" className="btn-primary px-8 py-4 text-lg">
            Start the Test <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
        <ul className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
          {FACTS.map(({ icon: Icon, label }) => (
            <li key={label} className="card-soft flex flex-col items-center gap-2 p-4 text-sm font-semibold">
              <Icon className="h-5 w-5 text-primary" aria-hidden />
              {label}
            </li>
          ))}
        </ul>
        <p className="mx-auto mt-8 max-w-lg text-xs text-muted-foreground">
          This assessment is for educational and entertainment purposes and is not a clinical psychological diagnosis.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-5">
        <h2 className="text-center text-3xl font-bold">16 types, 4 families</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {CATS.map((cat) => (
            <div key={cat} className="card-soft p-6">
              <div className="flex items-center gap-2">
                <span className={`h-3 w-3 rounded-full ${CATEGORY_CLASS[cat]}`} aria-hidden />
                <h3 className="font-bold">{cat}s</h3>
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                {Object.values(TYPES).filter((t) => t.category === cat).map((t) => (
                  <li key={t.type} className="flex justify-between">
                    <span className="font-display font-semibold">{t.type}</span>
                    <span className="text-muted-foreground">{t.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
