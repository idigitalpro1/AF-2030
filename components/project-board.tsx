"use client";

import { useMemo, useState } from "react";
import {
  SATCOM_FINISHED,
  SHOP_PROJECTS,
  type ProjectLane,
  type ProjectStatus,
  type ShopProject,
} from "@/lib/projects";

type FilterId = "all" | ProjectStatus | ProjectLane;

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

function ProjectCard({
  project,
  index,
}: {
  project: ShopProject;
  index: number;
}) {
  return (
    <article
      className={`project${project.status === "finished" ? " project--finished" : ""}`}
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
        </div>
      </div>
    </article>
  );
}

export function ProjectBoard() {
  const [filter, setFilter] = useState<FilterId>("all");

  const projects = useMemo(() => {
    if (filter === "all") return SHOP_PROJECTS;
    if (LANES.has(filter as ProjectLane)) {
      return SHOP_PROJECTS.filter((p) => p.lane === filter);
    }
    return SHOP_PROJECTS.filter((p) => p.status === filter);
  }, [filter]);

  const showSatcom = filter === "all" || filter === "satcom" || filter === "finished";

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

      <div className="project-list">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

      {showSatcom ? (
        <div className="satcom" aria-label="SATCOM finished cards">
          <header className="satcom__head">
            <p className="eyebrow">SATCOM</p>
            <h2>Finished cards</h2>
            <p className="satcom__lede">
              Completed shop builds filed for Nest handoff and archive — mirrors
              the SATCOM portfolio lane on CoPress.
            </p>
          </header>
          <div className="project-list project-list--satcom">
            {SATCOM_FINISHED.map((project, index) => (
              <ProjectCard
                key={`satcom-${project.id}`}
                project={project}
                index={index}
              />
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
