"use client";

import { useMemo, useState } from "react";
import { getCampaign, HALL_OF_FAME } from "@/lib/campaigns";
import { usePush } from "@/lib/push-context";
import {
  SATCOM_FINISHED,
  SHOP_PROJECTS,
  type ProjectLane,
  type ProjectStatus,
  type ShopProject,
} from "@/lib/projects";

type FilterId = "all" | ProjectStatus | ProjectLane | "hof";

const FILTERS: Array<{ id: FilterId; label: string }> = [
  { id: "all", label: "All" },
  { id: "publishing", label: "Publishing" },
  { id: "agents", label: "Agents" },
  { id: "templates", label: "Templates" },
  { id: "platform", label: "Platform" },
  { id: "brands", label: "Brands" },
  { id: "live", label: "Live" },
  { id: "building", label: "Building" },
  { id: "finished", label: "Finished" },
  { id: "satcom", label: "SATCOM" },
  { id: "hof", label: "Hall of Fame" },
];

const LANES = new Set<ProjectLane>([
  "publishing",
  "agents",
  "templates",
  "brands",
  "platform",
  "satcom",
]);

function statusLabel(status: ProjectStatus) {
  switch (status) {
    case "live":
      return "Live";
    case "template":
      return "Template";
    case "agent":
      return "Agent";
    case "building":
      return "Building";
    case "finished":
      return "Finished";
    case "ops":
      return "Ops";
  }
}

function campaignIdForProject(project: ShopProject) {
  return getCampaign(`campaign-${project.slug}`)?.id;
}

function ProjectCard({
  project,
  index,
  onPush,
}: {
  project: ShopProject;
  index: number;
  onPush?: (campaignId: string) => void;
}) {
  const campaignId = campaignIdForProject(project);
  const campaign = campaignId ? getCampaign(campaignId) : undefined;

  return (
    <article
      className={`project${project.status === "finished" ? " project--finished" : ""}${campaign?.hallOfFame ? " project--hof" : ""}`}
      style={{ animationDelay: `${index * 45}ms` }}
    >
      <div className="project__rank">{String(project.rank).padStart(2, "0")}</div>
      <div className="project__body">
        <div className="project__title-row">
          <h3>{project.name}</h3>
          <span className={`tag tag--${project.status}`}>
            {statusLabel(project.status)}
          </span>
          <span className="tag tag--lane">{project.lane}</span>
          {project.highlight ? (
            <span className="tag tag--hot">{project.highlight}</span>
          ) : null}
          {campaign?.hallOfFame ? (
            <span className="tag tag--hof">HOF</span>
          ) : null}
        </div>
        <p>{project.blurb}</p>
        <ul className="stack">
          {project.stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="project__links">
          {project.url ? (
            <a href={project.url} target="_blank" rel="noreferrer">
              Open
            </a>
          ) : null}
          {project.nestHref ? (
            <a href={project.nestHref} target="_blank" rel="noreferrer">
              Nest
            </a>
          ) : null}
          {project.repo ? (
            <a
              href={`https://github.com/${project.repo}`}
              target="_blank"
              rel="noreferrer"
            >
              Repo
            </a>
          ) : null}
          {campaignId && onPush ? (
            <button
              type="button"
              className="project__push"
              onClick={() => onPush(campaignId)}
            >
              Push
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function HofCard({
  campaign,
  index,
  onPush,
}: {
  campaign: (typeof HALL_OF_FAME)[number];
  index: number;
  onPush: (campaignId: string) => void;
}) {
  return (
    <article
      className="project project--hof project--finished"
      style={{ animationDelay: `${index * 45}ms` }}
    >
      <div className="project__rank">★</div>
      <div className="project__body">
        <div className="project__title-row">
          <h3>{campaign.name}</h3>
          <span className="tag tag--hof">Hall of Fame</span>
        </div>
        <p>{campaign.blurb}</p>
        <div className="project__links">
          {campaign.nestHref ? (
            <a href={campaign.nestHref} target="_blank" rel="noreferrer">
              Nest
            </a>
          ) : null}
          <button
            type="button"
            className="project__push"
            onClick={() => onPush(campaign.id)}
          >
            Push
          </button>
        </div>
      </div>
    </article>
  );
}

export function ProjectBoard() {
  const [filter, setFilter] = useState<FilterId>("all");
  const { openPushForCampaign } = usePush();

  const projects = useMemo(() => {
    if (filter === "hof") return [];
    if (filter === "all") return SHOP_PROJECTS;
    if (LANES.has(filter as ProjectLane)) {
      return SHOP_PROJECTS.filter((p) => p.lane === filter);
    }
    return SHOP_PROJECTS.filter((p) => p.status === filter);
  }, [filter]);

  const showSatcom =
    filter === "all" || filter === "satcom" || filter === "finished" || filter === "hof";
  const showHof = filter === "all" || filter === "hof";

  return (
    <section className="board" aria-label="Vercel shop projects">
      <header className="board__head">
        <p className="eyebrow">5Star · Vercel team</p>
        <h2>Development fleet</h2>
      </header>

      <div className="board__toolbar" role="tablist" aria-label="Filter projects">
        {FILTERS.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={filter === item.id}
            className={filter === item.id ? "chip chip--active" : "chip"}
            onClick={() => setFilter(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {filter !== "hof" ? (
        <div className="project-list">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onPush={openPushForCampaign}
            />
          ))}
        </div>
      ) : null}

      {showHof ? (
        <div className="hof" aria-label="Hall of Fame campaigns">
          <header className="hof__head">
            <p className="eyebrow">Hall of Fame</p>
            <h2>Campaign spotlight</h2>
            <p className="satcom__lede">
              Push finished wins and flagship campaigns to SMS, email, and Nest /
              SATCOM sites from the chat center.
            </p>
          </header>
          <div className="project-list project-list--hof">
            {HALL_OF_FAME.map((campaign, index) => (
              <HofCard
                key={campaign.id}
                campaign={campaign}
                index={index}
                onPush={openPushForCampaign}
              />
            ))}
          </div>
        </div>
      ) : null}

      {showSatcom && filter !== "hof" ? (
        <div className="satcom" aria-label="SATCOM finished cards">
          <header className="satcom__head">
            <p className="eyebrow">SATCOM</p>
            <h2>Finished cards</h2>
            <p className="satcom__lede">
              Completed shop builds filed for Nest handoff — push any card to SMS,
              email, or live sites.
            </p>
          </header>
          <div className="project-list project-list--satcom">
            {SATCOM_FINISHED.map((project, index) => (
              <ProjectCard
                key={`satcom-${project.id}`}
                project={project}
                index={index}
                onPush={openPushForCampaign}
              />
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
