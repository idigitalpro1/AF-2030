# Google auth setup (idigitalpro.com/dev)

```bash
AUTH_SECRET=…          # openssl rand -base64 32
AUTH_URL=https://www.idigitalpro.com/dev
AUTH_GOOGLE_ID=…
AUTH_GOOGLE_SECRET=…
```

Redirect URIs in Google Cloud Console:

- `https://www.idigitalpro.com/dev/api/auth/callback/google`
- `https://gateway-desk.vercel.app/dev/api/auth/callback/google`
- `http://localhost:3000/dev/api/auth/callback/google`

Allowed sign-in emails are configured in `lib/auth-allowlist.ts`.
