export type ProjectStatus =
  | "live"
  | "building"
  | "template"
  | "agent"
  | "finished"
  | "ops";

export type ProjectLane =
  | "publishing"
  | "agents"
  | "templates"
  | "brands"
  | "platform"
  | "satcom";

export type ShopProject = {
  id: string;
  rank: number;
  name: string;
  slug: string;
  blurb: string;
  stack: string[];
  status: ProjectStatus;
  lane: ProjectLane;
  repo?: string;
  url?: string;
  nestHref?: string;
  highlight?: string;
};

/** Multi-project Vercel shop fleet — engineering twin to Nest / admin.copress.news */
export const SHOP_PROJECTS: ShopProject[] = [
  {
    id: "copress-dashboard",
    rank: 1,
    name: "Nest · CoPress Dashboard",
    slug: "copress-dashboard",
    blurb:
      "Publishing spine for CoPress — editorial, newsletter studio, network HQ, SATCO Academy.",
    stack: ["Static HTML", "Vercel", "Nest"],
    status: "ops",
    lane: "publishing",
    repo: "idigitalpro1/copress-dashboard",
    url: "https://copress-dashboard.vercel.app",
    nestHref: "https://copress-dashboard.vercel.app/",
    highlight: "Admin twin",
  },
  {
    id: "gateway-desk",
    rank: 2,
    name: "Vercel Shop Desk",
    slug: "gateway-desk",
    blurb:
      "This desk — multi-project Vercel development command surface complementary to Nest.",
    stack: ["Next.js", "AI SDK", "AI Gateway"],
    status: "live",
    lane: "platform",
    repo: "idigitalpro1/AF-2030",
    url: "https://gateway-desk.vercel.app",
    highlight: "You are here",
  },
  {
    id: "wrc-frontend",
    rank: 3,
    name: "Weekly Register-Call",
    slug: "wrc-frontend",
    blurb: "WRC newspaper frontend — foothills newsroom product surface.",
    stack: ["Next.js", "Publishing"],
    status: "live",
    lane: "publishing",
    repo: "idigitalpro1/wrc-frontend",
    nestHref: "https://copress-dashboard.vercel.app/newsletter",
  },
  {
    id: "thevillager",
    rank: 4,
    name: "The Villager",
    slug: "thevillager",
    blurb: "Villager publication channel — subscribe + newsletter modes in Nest.",
    stack: ["Next.js", "Newsletter"],
    status: "live",
    lane: "publishing",
    repo: "idigitalpro1/weekly-register-call",
    url: "https://subscribe.thevillager.today",
    nestHref: "https://copress-dashboard.vercel.app/subscribe-villager/",
  },
  {
    id: "villager-today-git",
    rank: 5,
    name: "villager.today",
    slug: "villager-today-git",
    blurb: "Villager.today git-linked app — latest publishing product deploy.",
    stack: ["Next.js", "Git"],
    status: "building",
    lane: "publishing",
    repo: "idigitalpro1/villager.today",
  },
  {
    id: "lead-agent",
    rank: 6,
    name: "Lead Agent",
    slug: "lead-agent",
    blurb: "Inbound lead qualification agent — research, score, route for CoPress sales.",
    stack: ["AI SDK", "Workflow", "Agents"],
    status: "agent",
    lane: "agents",
    repo: "idigitalpro1/lead-agent",
    highlight: "New",
  },
  {
    id: "lead-processing-agent",
    rank: 7,
    name: "Lead Processing Agent",
    slug: "lead-processing-agent",
    blurb: "Lead pipeline processor from AI Gateway templates — handoff into Nest ops.",
    stack: ["Next.js", "AI SDK"],
    status: "agent",
    lane: "agents",
    repo: "idigitalpro1/lead-processing-agent",
  },
  {
    id: "vercal-chat-template",
    rank: 8,
    name: "Vercal Chat Template",
    slug: "vercal-chat-template",
    blurb: "AI Gateway eve chat template — durable sessions for shop agents.",
    stack: ["eve", "AI Gateway"],
    status: "template",
    lane: "templates",
    repo: "idigitalpro1/vercal-chat-template",
    url: "https://vercal-chat-template.vercel.app",
  },
  {
    id: "eve-chat-template",
    rank: 9,
    name: "eve Chat Template",
    slug: "eve-chat-template",
    blurb: "Production eve chat with Neon history and Vercel Connect channels.",
    stack: ["eve", "Neon", "Better Auth"],
    status: "template",
    lane: "templates",
    repo: "idigitalpro1/eve-chat-template",
  },
  {
    id: "vercel-ai-template-demo",
    rank: 10,
    name: "Vercel AI Template Demo",
    slug: "vercel-ai-template-demo",
    blurb: "Fresh AI Gateway template demo for shop prototyping.",
    stack: ["AI Gateway", "Templates"],
    status: "template",
    lane: "templates",
    highlight: "New",
  },
  {
    id: "codex-admin",
    rank: 11,
    name: "Codex Admin",
    slug: "codex-admin",
    blurb: "Factory admin for Codex agent jobs — pairs with Nest Hermes bridges.",
    stack: ["Next.js", "Codex"],
    status: "live",
    lane: "platform",
    repo: "idigitalpro1/Codex-factory",
  },
  {
    id: "github-dashboard",
    rank: 12,
    name: "GitHub Dashboard",
    slug: "github-dashboard",
    blurb: "Repo and PR health across the Vercel shop fleet.",
    stack: ["Next.js", "GitHub"],
    status: "live",
    lane: "platform",
    repo: "idigitalpro1/github-dashboard",
  },
  {
    id: "admin-panel",
    rank: 13,
    name: "Admin Panel",
    slug: "admin-panel",
    blurb: "Shared product admin shell — bridge toward admin.copress.news workflows.",
    stack: ["Next.js", "Auth"],
    status: "building",
    lane: "platform",
    repo: "idigitalpro1/admin-panel",
  },
  {
    id: "5280-menu",
    rank: 14,
    name: "5280 Menu",
    slug: "5280-menu",
    blurb: "5280 / foothills menu surface — satcom.5280.menu campaign host sibling.",
    stack: ["Next.js", "5280"],
    status: "building",
    lane: "brands",
    repo: "idigitalpro1/5280-menu",
  },
  {
    id: "aspen-fashion",
    rank: 15,
    name: "Aspen Fashion",
    slug: "aspen-fashion",
    blurb: "Aspen Fashion brand experience — AF-2030 lane.",
    stack: ["Next.js", "Brand"],
    status: "live",
    lane: "brands",
    repo: "idigitalpro1/aspen",
  },
  {
    id: "fleurish-society",
    rank: 16,
    name: "Fleurish Society",
    slug: "fleurish-society",
    blurb: "Brand storytelling site with motion-led product narrative.",
    stack: ["Next.js", "Design"],
    status: "live",
    lane: "brands",
    repo: "idigitalpro1/fleurish-society",
  },
  {
    id: "chatbot",
    rank: 17,
    name: "Chatbot",
    slug: "chatbot",
    blurb: "Flagship multi-model chatbot routed through AI Gateway.",
    stack: ["AI Gateway", "AI SDK"],
    status: "live",
    lane: "agents",
    repo: "idigitalpro1/chatbot",
  },
  {
    id: "ricks-conews-press",
    rank: 18,
    name: "Rick's CoNews Press",
    slug: "ricks-conews-press",
    blurb: "Rick's Cabaret campaign + editorial kit hosted on CoPress spine.",
    stack: ["Campaign Kit", "Nest"],
    status: "ops",
    lane: "publishing",
    repo: "idigitalpro1/copress-dashboard",
    url: "https://copress-dashboard.vercel.app/ricks-cabaret-dashboard/",
    nestHref: "https://copress-dashboard.vercel.app/ricks-cabaret-campaign-kit/",
  },
  {
    id: "national-intelligence-site",
    rank: 19,
    name: "National Intelligence Site",
    slug: "national-intelligence-site",
    blurb: "SATCOM academy / aerospace-intelligence brand surface — finished handoff.",
    stack: ["SATCOM", "Academy"],
    status: "finished",
    lane: "satcom",
    highlight: "SATCOM",
  },
  {
    id: "stripe-showcase",
    rank: 20,
    name: "Stripe Showcase",
    slug: "stripe-showcase",
    blurb: "Payments patterns closed out into SATCOM finished lane.",
    stack: ["Stripe", "Next.js"],
    status: "finished",
    lane: "satcom",
    repo: "idigitalpro1/stripe-showcase",
    highlight: "SATCOM",
  },
  {
    id: "headshots-starter-clone",
    rank: 21,
    name: "Headshots Starter",
    slug: "headshots-starter-clone",
    blurb: "AI headshot generator clone — delivery complete.",
    stack: ["AI", "Next.js"],
    status: "finished",
    lane: "satcom",
    repo: "idigitalpro1/headshots-starter-clone",
    highlight: "SATCOM",
  },
  {
    id: "vibe-coding-platform",
    rank: 22,
    name: "Vibe Coding Platform",
    slug: "vibe-coding-platform",
    blurb: "Rapid prototyping surface for agent-assisted shop builds.",
    stack: ["Next.js", "AI SDK"],
    status: "live",
    lane: "platform",
    repo: "idigitalpro1/vibe-coding-platform",
  },
];

export const NEST_LINKS = [
  {
    label: "Nest Admin HQ",
    href: "https://copress-dashboard.vercel.app/",
    note: "Publishing command center",
  },
  {
    label: "Network HQ",
    href: "https://copress-dashboard.vercel.app/network",
    note: "Properties + phone",
  },
  {
    label: "Newsletter Studio",
    href: "https://copress-dashboard.vercel.app/newsletter",
    note: "WRC / Villager",
  },
  {
    label: "SATCOM Portfolio",
    href: "https://copress-dashboard.vercel.app/portfolio",
    note: "Owned assets",
  },
  {
    label: "SATCO Academy",
    href: "https://copress-dashboard.vercel.app/learn",
    note: "Staff training",
  },
  {
    label: "Linear Ops",
    href: "https://copress-dashboard.vercel.app/linear",
    note: "Issues + cycles",
  },
] as const;

export const SATCOM_FINISHED = SHOP_PROJECTS.filter(
  (p) => p.lane === "satcom" && p.status === "finished",
);

export function projectCatalogForPrompt() {
  return SHOP_PROJECTS.map(
    (p) =>
      `${p.rank}. ${p.name} [${p.lane}/${p.status}] — ${p.blurb} Stack: ${p.stack.join(", ")}.`,
  ).join("\n");
}
