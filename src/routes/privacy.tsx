import { createFileRoute } from "@tanstack/react-router";
import { PageShell, ProseCard } from "@/components/SiteChrome";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy — MindType" },
      { name: "description", content: "MindType collects no personal information. Answers stay on your device." },
      { property: "og:title", content: "MindType Privacy" },
      { property: "og:description", content: "No accounts, no personal data — answers stay in your browser." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <PageShell>
      <ProseCard title="Privacy">
        <p>MindType does not require an account and does not collect personal information.</p>
        <p>Your answers are saved only in your own browser so a refresh doesn't erase your progress. They are never sent to a server. Restarting the test or clearing your browser data removes them.</p>
      </ProseCard>
    </PageShell>
  ),
});
