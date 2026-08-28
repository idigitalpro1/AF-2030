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
Also at: https://www.idigitalpro.com/dev

## Google sign-in (idigitalpro.com/dev)

Shop Desk requires Google OAuth. Allowed accounts:

- `@idigitalpro.com`
- `@villagerpublishing.com`
- `@idigitalprogmail.com`
- `denverwebguy@gmail.com`

Copy `.env.example` and set:

```bash
AUTH_SECRET=…          # openssl rand -base64 32
AUTH_URL=https://www.idigitalpro.com/dev
AUTH_GOOGLE_ID=…
AUTH_GOOGLE_SECRET=…
```

In Google Cloud Console, add redirect URIs:

- `https://www.idigitalpro.com/dev/api/auth/callback/google`
- `https://gateway-desk.vercel.app/dev/api/auth/callback/google`
- `http://localhost:3000/dev/api/auth/callback/google`

Add the same variables in the **gateway-desk** Vercel project, then redeploy.

## Develop

```bash
pnpm install
pnpm dev
```

AI chat needs AI Gateway auth (`vercel env pull` or `AI_GATEWAY_API_KEY`).
