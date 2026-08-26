export type ProjectStatus = "live" | "building" | "template" | "agent";

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
};

/** Curated top development projects from the 5Star / AI Gateway workspace. */
export const TOP_DEV_PROJECTS: DevProject[] = [
  {
    id: "vercal-chat-template",
    rank: 1,
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
  },
  {
    id: "lead-processing-agent",
    rank: 2,
    name: "Lead Processing Agent",
    slug: "lead-processing-agent",
    blurb:
      "Inbound lead qualification agent built on the AI SDK workflow stack — research, score, and route.",
    stack: ["Next.js", "AI SDK", "Workflow"],
    status: "agent",
    repo: "idigitalpro1/lead-processing-agent",
    highlight: "Created today",
    createdLabel: "Today",
  },
  {
    id: "vibe-coding-platform",
    rank: 3,
    name: "Vibe Coding Platform",
    slug: "vibe-coding-platform",
    blurb:
      "Interactive coding surface for rapid product prototypes and agent-assisted builds.",
    stack: ["Next.js", "AI SDK"],
    status: "live",
    repo: "idigitalpro1/vibe-coding-platform",
  },
  {
    id: "github-dashboard",
    rank: 4,
    name: "GitHub Dashboard",
    slug: "github-dashboard",
    blurb:
      "Ops view across repositories, pull requests, and delivery health for the development fleet.",
    stack: ["Next.js", "GitHub"],
    status: "live",
    repo: "idigitalpro1/github-dashboard",
  },
  {
    id: "codex-admin",
    rank: 5,
    name: "Codex Admin",
    slug: "codex-admin",
    blurb:
      "Factory admin console for Codex workflows — ship, review, and orchestrate agent jobs.",
    stack: ["Next.js", "Codex"],
    status: "live",
    repo: "idigitalpro1/Codex-factory",
  },
  {
    id: "eve-chat-template",
    rank: 6,
    name: "eve Chat Template",
    slug: "eve-chat-template",
    blurb:
      "Production-ready eve chat with Neon history, Upstash limits, and Vercel Connect channels.",
    stack: ["eve", "Neon", "Better Auth"],
    status: "template",
    repo: "idigitalpro1/eve-chat-template",
  },
  {
    id: "copress-dashboard",
    rank: 7,
    name: "CoPress Dashboard",
    slug: "copress-dashboard",
    blurb:
      "Press and newsletter operations dashboard powering CoNews editorial flows.",
    stack: ["Next.js", "Dashboard"],
    status: "live",
    repo: "idigitalpro1/copress-dashboard",
  },
  {
    id: "chatbot",
    rank: 8,
    name: "Chatbot",
    slug: "chatbot",
    blurb:
      "Flagship multi-model chatbot routed through AI Gateway for failover and spend control.",
    stack: ["AI Gateway", "AI SDK"],
    status: "live",
    repo: "idigitalpro1/chatbot",
  },
  {
    id: "admin-panel",
    rank: 9,
    name: "Admin Panel",
    slug: "admin-panel",
    blurb:
      "Shared admin shell for product settings, users, and operational toggles.",
    stack: ["Next.js", "Auth"],
    status: "building",
    repo: "idigitalpro1/admin-panel",
  },
  {
    id: "fleurish-society",
    rank: 10,
    name: "Fleurish Society",
    slug: "fleurish-society",
    blurb:
      "Brand experience site with modern motion and product storytelling.",
    stack: ["Next.js", "Design"],
    status: "live",
    repo: "idigitalpro1/fleurish-society",
  },
];

export function projectCatalogForPrompt() {
  return TOP_DEV_PROJECTS.map(
    (p) =>
      `${p.rank}. ${p.name} (${p.status}) — ${p.blurb} Stack: ${p.stack.join(", ")}.`,
  ).join("\n");
}
