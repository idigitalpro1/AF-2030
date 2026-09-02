import { SATCOM_FINISHED, SHOP_PROJECTS, type ShopProject } from "@/lib/projects";

export type PushChannel = "sms" | "email" | "sites";

export type Campaign = {
  id: string;
  name: string;
  slug: string;
  blurb: string;
  projectId?: string;
  hallOfFame: boolean;
  defaultChannels: PushChannel[];
  smsBody: string;
  emailSubject: string;
  emailBody: string;
  siteTargets: Array<{ label: string; href: string }>;
  nestHref?: string;
};

export const PUSH_CHANNELS: Array<{ id: PushChannel; label: string; hint: string }> = [
  { id: "sms", label: "SMS", hint: "Twilio / Connect short codes" },
  { id: "email", label: "Email", hint: "Newsletter + transactional" },
  { id: "sites", label: "Sites", hint: "Nest, SATCOM, brand surfaces" },
];

function campaignFromProject(project: ShopProject, hallOfFame: boolean): Campaign {
  const siteTargets = [
    ...(project.url ? [{ label: project.name, href: project.url }] : []),
    ...(project.nestHref
      ? [{ label: "Nest surface", href: project.nestHref }]
      : []),
    { label: "SATCOM portfolio", href: "https://copress-dashboard.vercel.app/portfolio" },
  ];

  return {
    id: `campaign-${project.slug}`,
    name: project.name,
    slug: project.slug,
    blurb: project.blurb,
    projectId: project.id,
    hallOfFame,
    defaultChannels: hallOfFame ? ["sms", "email", "sites"] : ["email", "sites"],
    smsBody: `[CoPress] ${project.name} — ${project.blurb.slice(0, 90)}… ${project.url ?? project.nestHref ?? "copress.news"}`,
    emailSubject: `${project.name} — shop desk handoff`,
    emailBody: `${project.name}\n\n${project.blurb}\n\nOpen: ${project.url ?? project.nestHref ?? "https://copress-dashboard.vercel.app/"}`,
    siteTargets,
    nestHref: project.nestHref,
  };
}

/** Standalone editorial / brand campaigns not tied 1:1 to a shop card */
export const STANDALONE_CAMPAIGNS: Campaign[] = [
  {
    id: "campaign-hall-of-fame",
    name: "Hall of Fame",
    slug: "hall-of-fame",
    blurb: "Spotlight reel of finished SATCOM builds and flagship wins for Nest + network syndication.",
    hallOfFame: true,
    defaultChannels: ["sms", "email", "sites"],
    smsBody:
      "[CoPress HOF] New finished builds in SATCOM — National Intelligence, Stripe Showcase, Headshots Starter. copress.news/portfolio",
    emailSubject: "Hall of Fame — finished SATCOM builds",
    emailBody:
      "This week's Hall of Fame lane:\n\n• National Intelligence Site\n• Stripe Showcase\n• Headshots Starter\n• Vercel Shop Desk\n\nFiled for Nest handoff and network syndication.",
    siteTargets: [
      { label: "SATCOM portfolio", href: "https://copress-dashboard.vercel.app/portfolio" },
      { label: "Nest HQ", href: "https://copress-dashboard.vercel.app/" },
      { label: "Shop Desk", href: "https://gateway-desk.vercel.app/dev" },
    ],
    nestHref: "https://copress-dashboard.vercel.app/portfolio",
  },
  {
    id: "campaign-ricks-cabaret",
    name: "Rick's Cabaret Kit",
    slug: "ricks-cabaret",
    blurb: "Rick's CoNews Press campaign + editorial kit on the CoPress spine.",
    hallOfFame: false,
    defaultChannels: ["email", "sites"],
    smsBody: "[CoPress] Rick's Cabaret campaign kit is live — editorial + dashboard on Nest.",
    emailSubject: "Rick's Cabaret — campaign kit ready",
    emailBody:
      "Rick's Cabaret campaign kit is staged on Nest.\n\nDashboard + editorial surfaces are ready for operator review.",
    siteTargets: [
      {
        label: "Campaign dashboard",
        href: "https://copress-dashboard.vercel.app/ricks-cabaret-dashboard/",
      },
      {
        label: "Campaign kit",
        href: "https://copress-dashboard.vercel.app/ricks-cabaret-campaign-kit/",
      },
    ],
    nestHref: "https://copress-dashboard.vercel.app/ricks-cabaret-campaign-kit/",
  },
];

const projectCampaigns = SHOP_PROJECTS.map((project) =>
  campaignFromProject(project, project.lane === "satcom" && project.status === "finished"),
);

export const CAMPAIGNS: Campaign[] = [
  ...STANDALONE_CAMPAIGNS,
  ...projectCampaigns.filter(
    (c) => !STANDALONE_CAMPAIGNS.some((s) => s.projectId === c.projectId),
  ),
];

export const HALL_OF_FAME = CAMPAIGNS.filter((c) => c.hallOfFame);

export function getCampaign(id: string): Campaign | undefined {
  return CAMPAIGNS.find((c) => c.id === id);
}

export function campaignsForPrompt() {
  return CAMPAIGNS.map(
    (c) =>
      `${c.name} [${c.hallOfFame ? "HOF" : "campaign"}] — ${c.blurb} Channels: ${c.defaultChannels.join(", ")}.`,
  ).join("\n");
}
