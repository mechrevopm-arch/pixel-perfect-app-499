import { createFileRoute } from "@tanstack/react-router";
import { PageShell, ProseCard } from "@/components/SiteChrome";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title: "Disclaimer — MindType" },
      { name: "description", content: "MindType is an informational assessment, not a clinical psychological test." },
      { property: "og:title", content: "MindType Disclaimer" },
      { property: "og:description", content: "MindType is for education and entertainment, not diagnosis." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <PageShell>
      <ProseCard title="Disclaimer">
        <p>MindType is an informational personality assessment inspired by the MBTI framework. It is not a clinical psychological test or professional diagnosis.</p>
        <p>This assessment is for educational and entertainment purposes. Results describe possible tendencies and should not be used for hiring, medical, or other important decisions. MindType is not affiliated with the official Myers-Briggs Type Indicator®.</p>
      </ProseCard>
    </PageShell>
  ),
});
