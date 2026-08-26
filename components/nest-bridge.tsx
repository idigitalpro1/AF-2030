import { NEST_LINKS } from "@/lib/projects";

export function NestBridge() {
  return (
    <aside className="nest-bridge" aria-label="Nest admin bridges">
      <p className="eyebrow">Complements</p>
      <h2>
        Nest · <span>admin.copress.news</span>
      </h2>
      <p className="nest-bridge__lede">
        Publishing ops live in Nest. This desk owns the Vercel shop development
        fleet — deploys, agents, templates, and SATCOM finished handoffs.
      </p>
      <ul className="nest-bridge__list">
        {NEST_LINKS.map((link) => (
          <li key={link.href}>
            <a href={link.href} target="_blank" rel="noreferrer">
              <strong>{link.label}</strong>
              <span>{link.note}</span>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
