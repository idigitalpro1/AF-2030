# Gateway Desk

Top development projects dashboard powered by **Vercel AI Gateway**.

## Features

- Ranked board of active development projects, templates, and agents
- Highlights AI Gateway templates created today (`vercal-chat-template`, `lead-processing-agent`)
- Streaming assistant via AI SDK + AI Gateway (`anthropic/claude-sonnet-4.5`)

## Develop

```bash
pnpm install
pnpm dev
```

For local AI Gateway auth, link a Vercel project and pull env:

```bash
vercel link
vercel env pull
```

Or set `AI_GATEWAY_API_KEY`.

## Deploy

Push to GitHub and deploy on the 5Star (`5280menu`) team, or:

```bash
vercel --prod
```
