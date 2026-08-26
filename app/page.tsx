import { GatewayAssistant } from "@/components/gateway-assistant";
import { ProjectBoard } from "@/components/project-board";
import { TOP_DEV_PROJECTS } from "@/lib/projects";

export default function Home() {
  const createdToday = TOP_DEV_PROJECTS.filter((p) => p.createdLabel === "Today")
    .length;
  const liveCount = TOP_DEV_PROJECTS.filter((p) => p.status === "live").length;

  return (
    <main className="shell">
      <header className="hero">
        <p className="eyebrow">Vercel AI Gateway · Templates</p>
        <h1 className="brand">
          Gateway <span>Desk</span>
        </h1>
        <p className="lede">
          Top development projects across the 5Star workspace — including AI
          Gateway templates created today — with an assistant that helps you
          prioritize what ships next.
        </p>
        <div className="meta-row">
          <span className="meta">
            <strong>{TOP_DEV_PROJECTS.length}</strong> ranked builds
          </span>
          <span className="meta">
            <strong>{createdToday}</strong> created today
          </span>
          <span className="meta">
            <strong>{liveCount}</strong> live
          </span>
        </div>
      </header>

      <div className="layout">
        <ProjectBoard />
        <GatewayAssistant />
      </div>

      <p className="foot">
        Built on the AI Gateway chat pattern from today&apos;s vercal / eve
        templates. Model traffic routes through Vercel AI Gateway.
      </p>
    </main>
  );
}
