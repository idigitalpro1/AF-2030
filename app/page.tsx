import { DeskShell } from "@/components/desk-shell";
import { HALL_OF_FAME } from "@/lib/campaigns";
import { SATCOM_FINISHED, SHOP_PROJECTS } from "@/lib/projects";

export default function Home() {
  const live = SHOP_PROJECTS.filter((p) => p.status === "live").length;
  const agents = SHOP_PROJECTS.filter((p) => p.lane === "agents").length;
  const publishing = SHOP_PROJECTS.filter((p) => p.lane === "publishing").length;

  return (
    <div className="frame">
      <header className="topbar">
        <div className="topbar__mast">
          <span className="t-name">copress</span>
          <span className="t-tld">.news</span>
          <span className="t-pipe">|</span>
          <span className="t-section">Vercel Shop Desk</span>
        </div>
        <div className="topbar__center">5Star team · complements Nest</div>
        <div className="topbar__right">
          <a
            className="topbar__link"
            href="https://copress-dashboard.vercel.app/"
            target="_blank"
            rel="noreferrer"
          >
            Open Nest
          </a>
        </div>
      </header>

      <main className="shell">
        <section className="hero">
          <p className="eyebrow">Multi-project Vercel shop</p>
          <h1 className="brand">
            Development <em>Desk</em>
          </h1>
          <p className="lede">
            Engineering twin to Nest / admin.copress.news — rank deploys, agents,
            templates, and brand apps across the 5Star Vercel fleet, then file
            finished work into SATCOM.
          </p>
          <div className="meta-row">
            <span className="meta">
              <strong>{SHOP_PROJECTS.length}</strong> shop projects
            </span>
            <span className="meta">
              <strong>{publishing}</strong> publishing
            </span>
            <span className="meta">
              <strong>{agents}</strong> agents
            </span>
            <span className="meta">
              <strong>{live}</strong> live
            </span>
            <span className="meta">
              <strong>{SATCOM_FINISHED.length}</strong> SATCOM finished
            </span>
            <span className="meta">
              <strong>{HALL_OF_FAME.length}</strong> Hall of Fame
            </span>
          </div>
        </section>

        <DeskShell />
      </main>
    </div>
  );
}
