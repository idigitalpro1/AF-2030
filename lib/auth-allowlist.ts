/** Domains allowed to sign in with Google on idigitalpro.com / Shop Desk */
export const ALLOWED_EMAIL_DOMAINS = [
  "idigitalpro.com",
  "villagerpublishing.com",
  "idigitalprogmail.com",
] as const;

/** Individual addresses allowed outside the domain list */
export const ALLOWED_EMAILS = ["denverwebguy@gmail.com"] as const;

export function isEmailAllowed(email: string | null | undefined): boolean {
  if (!email) return false;

  const normalized = email.trim().toLowerCase();
  if ((ALLOWED_EMAILS as readonly string[]).includes(normalized)) return true;

  const domain = normalized.split("@")[1];
  if (!domain) return false;

  return (ALLOWED_EMAIL_DOMAINS as readonly string[]).includes(domain);
}

export function allowlistSummary(): string {
  const domains = ALLOWED_EMAIL_DOMAINS.map((domain) => `@${domain}`).join(", ");
  const extras = ALLOWED_EMAILS.join(", ");
  return `${domains}, and ${extras}`;
}
