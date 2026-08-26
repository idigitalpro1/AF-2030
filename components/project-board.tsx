"use client";

import { useMemo, useState } from "react";
import {
  TOP_DEV_PROJECTS,
  type DevProject,
  type ProjectStatus,
} from "@/lib/projects";

const FILTERS: Array<{ id: "all" | ProjectStatus; label: string }> = [
  { id: "all", label: "All" },
  { id: "live", label: "Live" },
  { id: "template", label: "Templates" },
  { id: "agent", label: "Agents" },
  { id: "building", label: "Building" },
];

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
  }
}

export function ProjectBoard({
  onSelect,
}: {
  onSelect?: (project: DevProject) => void;
}) {
  const [filter, setFilter] = useState<"all" | ProjectStatus>("all");

  const projects = useMemo(() => {
    if (filter === "all") return TOP_DEV_PROJECTS;
    return TOP_DEV_PROJECTS.filter((project) => project.status === filter);
  }, [filter]);

  return (
    <section className="board" aria-label="Top development projects">
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

      <ol className="project-list">
        {projects.map((project, index) => (
          <li
            key={project.id}
            className="project"
            style={{ animationDelay: `${index * 60}ms` }}
          >
            <button
              type="button"
              className="project__hit"
              onClick={() => onSelect?.(project)}
            >
              <span className="project__rank">
                {String(project.rank).padStart(2, "0")}
              </span>
              <div className="project__body">
                <div className="project__title-row">
                  <h3>{project.name}</h3>
                  <span className={`tag tag--${project.status}`}>
                    {statusLabel(project.status)}
                  </span>
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
              </div>
            </button>
            <div className="project__links">
              {project.url ? (
                <a href={project.url} target="_blank" rel="noreferrer">
                  Open
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
          </li>
        ))}
      </ol>
    </section>
  );
}
