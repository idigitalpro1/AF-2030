# idigitalpro.com edge router

Lightweight Next.js app deployed to the Vercel **codex-admin** project (owns `idigitalpro.com` / `www.idigitalpro.com`).

## Routing

| Path | Destination |
|------|-------------|
| `/dev`, `/en/dev` | [gateway-desk](https://gateway-desk.vercel.app/dev) — Vercel Shop Desk |
| `/`, `/en` | [copress-dashboard](https://copress-dashboard.vercel.app) — Nest |
| everything else | `codex-admin-git-main-5280menu.vercel.app` — Codex SATCOM / admin |

## Deploy

Redeploy this folder to the **codex-admin** production project whenever a Codex-factory main push overwrites production aliases.

Root Directory must be `deploy/idigitalpro-router` when deploying from AF-2030, or flatten the files under `apps/codex-admin` for a file deploy into the existing project rootDirectory setting.
