# Vercel Shop Desk

Multi-project **Vercel development dashboard** for the 5Star shop — the engineering twin to **Nest** (`copress-dashboard` / admin.copress.news).

## Complements Nest

| Nest (publishing ops) | Shop Desk (this app) |
| --- | --- |
| Editorial, newsletter, network, academy | Deploys, agents, templates, brand apps |
| SATCOM portfolio / finished assets | SATCOM finished lane for shop handoffs |
| Operator command center | AI Gateway ship-planning assistant |

Live Nest: https://copress-dashboard.vercel.app  
Live Shop Desk: https://gateway-desk.vercel.app

## Develop

```bash
pnpm install
pnpm dev
```

AI chat needs AI Gateway auth (`vercel env pull` or `AI_GATEWAY_API_KEY`).
