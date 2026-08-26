export type ProjectStatus =
  | "live"
  | "building"
  | "template"
  | "agent"
  | "finished";

export type DevProject = {
  id: string;
  rank: number;
  name: string;
  slug: string;
  blurb: string;
  stack: string[];
  status: ProjectStatus;
  repo?: string;
  url?: string;
  highlight?: string;
  createdLabel?: string;
  /** Program lane — finished work lands in SATCOM. */
  lane?: "satcom" | "gateway" | "core";
};

/** Curated top development projects from the 5Star / AI Gateway workspace. */
export const TOP_DEV_PROJECTS: DevProject[] = [
  {
    id: "gateway-desk",
    rank: 1,
    name: "Gateway Desk",
    slug: "gateway-desk",
    blurb:
      "Top development projects dashboard with AI Gateway assistant — deployed and verified on Vercel.",
    stack: ["Next.js", "AI SDK", "AI Gateway"],
    status: "finished",
    repo: "idigitalpro1/AF-2030",
    url: "https://gateway-desk.vercel.app",
    highlight: "Deployed today",
    createdLabel: "Today",
    lane: "satcom",
  },
  {
    id: "vercal-chat-template",
    rank: 2,
    name: "Vercal Chat Template",
    slug: "vercal-chat-template",
    blurb:
      "AI Gateway eve chat template spun up today — durable sessions, streaming replies, template shell for agents.",
    stack: ["Next.js", "eve", "AI Gateway"],
    status: "template",
    repo: "idigitalpro1/vercal-chat-template",
    url: "https://vercal-chat-template.vercel.app",
    highlight: "Created today",
    createdLabel: "Today",
    lane: "gateway",
  },
  {
    id: "lead-processing-agent",
    rank: 3,
    name: "Lead Processing Agent",
    slug: "lead-processing-agent",
    blurb:
      "Inbound lead qualification agent built on the AI SDK workflow stack — research, score, and route.",
    stack: ["Next.js", "AI SDK", "Workflow"],
    status: "agent",
    repo: "idigitalpro1/lead-processing-agent",
    highlight: "Created today",
    createdLabel: "Today",
    lane: "gateway",
  },
  {
    id: "vibe-coding-platform",
    rank: 4,
    name: "Vibe Coding Platform",
    slug: "vibe-coding-platform",
    blurb:
      "Interactive coding surface for rapid product prototypes and agent-assisted builds.",
    stack: ["Next.js", "AI SDK"],
    status: "live",
    repo: "idigitalpro1/vibe-coding-platform",
    lane: "core",
  },
  {
    id: "github-dashboard",
    rank: 5,
    name: "GitHub Dashboard",
    slug: "github-dashboard",
    blurb:
      "Ops view across repositories, pull requests, and delivery health for the development fleet.",
    stack: ["Next.js", "GitHub"],
    status: "live",
    repo: "idigitalpro1/github-dashboard",
    lane: "core",
  },
  {
    id: "codex-admin",
    rank: 6,
    name: "Codex Admin",
    slug: "codex-admin",
    blurb:
      "Factory admin console for Codex workflows — ship, review, and orchestrate agent jobs.",
    stack: ["Next.js", "Codex"],
    status: "live",
    repo: "idigitalpro1/Codex-factory",
    lane: "core",
  },
  {
    id: "eve-chat-template",
    rank: 7,
    name: "eve Chat Template",
    slug: "eve-chat-template",
    blurb:
      "Production-ready eve chat with Neon history, Upstash limits, and Vercel Connect channels.",
    stack: ["eve", "Neon", "Better Auth"],
    status: "template",
    repo: "idigitalpro1/eve-chat-template",
    lane: "gateway",
  },
  {
    id: "copress-dashboard",
    rank: 8,
    name: "CoPress Dashboard",
    slug: "copress-dashboard",
    blurb:
      "Press and newsletter operations dashboard powering CoNews editorial flows.",
    stack: ["Next.js", "Dashboard"],
    status: "live",
    repo: "idigitalpro1/copress-dashboard",
    lane: "core",
  },
  {
    id: "chatbot",
    rank: 9,
    name: "Chatbot",
    slug: "chatbot",
    blurb:
      "Flagship multi-model chatbot routed through AI Gateway for failover and spend control.",
    stack: ["AI Gateway", "AI SDK"],
    status: "live",
    repo: "idigitalpro1/chatbot",
    lane: "gateway",
  },
  {
    id: "admin-panel",
    rank: 10,
    name: "Admin Panel",
    slug: "admin-panel",
    blurb:
      "Shared admin shell for product settings, users, and operational toggles.",
    stack: ["Next.js", "Auth"],
    status: "building",
    repo: "idigitalpro1/admin-panel",
    lane: "core",
  },
  {
    id: "national-intelligence-site",
    rank: 11,
    name: "National Intelligence Site",
    slug: "national-intelligence-site",
    blurb:
      "SATCOM-facing intelligence briefing surface — content rails, alerts, and secure publish flow.",
    stack: ["Next.js", "SATCOM"],
    status: "finished",
    highlight: "SATCOM",
    lane: "satcom",
  },
  {
    id: "stripe-showcase",
    rank: 12,
    name: "Stripe Showcase",
    slug: "stripe-showcase",
    blurb:
      "Payments demo and checkout patterns — closed out and archived into SATCOM finished lane.",
    stack: ["Next.js", "Stripe"],
    status: "finished",
    repo: "idigitalpro1/stripe-showcase",
    highlight: "SATCOM",
    lane: "satcom",
  },
  {
    id: "headshots-starter-clone",
    rank: 13,
    name: "Headshots Starter",
    slug: "headshots-starter-clone",
    blurb:
      "AI headshot generator clone — delivery complete, filed under SATCOM finished cards.",
    stack: ["Next.js", "AI"],
    status: "finished",
    repo: "idigitalpro1/headshots-starter-clone",
    highlight: "SATCOM",
    lane: "satcom",
  },
  {
    id: "fleurish-society",
    rank: 14,
    name: "Fleurish Society",
    slug: "fleurish-society",
    blurb:
      "Brand experience site with modern motion and product storytelling.",
    stack: ["Next.js", "Design"],
    status: "live",
    repo: "idigitalpro1/fleurish-society",
    lane: "core",
  },
];

export const SATCOM_FINISHED = TOP_DEV_PROJECTS.filter(
  (p) => p.lane === "satcom" && p.status === "finished",
);

export function projectCatalogForPrompt() {
  return TOP_DEV_PROJECTS.map(
    (p) =>
      `${p.rank}. ${p.name} (${p.status}${p.lane ? `, lane:${p.lane}` : ""}) — ${p.blurb} Stack: ${p.stack.join(", ")}.`,
  ).join("\n");
}
