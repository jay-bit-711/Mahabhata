import { createFileRoute } from "@tanstack/react-router";
import { CampaignApp } from "@/components/engine/Campaign";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return <CampaignApp />;
}