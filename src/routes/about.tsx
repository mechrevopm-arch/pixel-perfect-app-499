import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, ProseCard } from "@/components/SiteChrome";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — MindType" },
      { name: "description", content: "How the MindType personality test works and what the four MBTI dimensions mean." },
      { property: "og:title", content: "About MindType" },
      { property: "og:description", content: "How the MindType MBTI-inspired assessment works." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <PageShell>
      <ProseCard title="About MindType">
        <p>MindType is a short, friendly personality assessment inspired by the MBTI framework. You answer 25 statements on a five-point scale, and we look at four preference pairs: Extraversion vs Introversion, Sensing vs Intuition, Thinking vs Feeling, and Judging vs Perceiving.</p>
        <p>Each statement leans toward one side of a pair. Your answers are added up per pair, and the stronger side becomes a letter in your four-letter type. The same answers always give the same result.</p>
        <p>Your result is an indication of tendencies — people are more complex than four letters.</p>
        <Link to="/test" className="btn-primary mt-2">Take the Test</Link>
      </ProseCard>
    </PageShell>
  ),
});
