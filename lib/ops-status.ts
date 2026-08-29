export type OpsSeverity = "down" | "degraded" | "ok";

export type OpsAlert = {
  id: string;
  severity: OpsSeverity;
  label: string;
  detail: string;
  href?: string;
  updatedAt: string;
};

/** Live ops signals surfaced on Shop Desk (phone / network / Nest). */
export const OPS_ALERTS: OpsAlert[] = [
  {
    id: "phone-303-830-1800",
    severity: "down",
    label: "303-830-1800",
    detail: "DOWN — Denver line offline. Route callers via Nest 3CX until restored.",
    href: "https://copress-dashboard.vercel.app/network",
    updatedAt: "2026-08-29",
  },
];

export const OPS_FALLBACKS = [
  {
    label: "3CX main",
    value: "+1 877-357-8499",
    href: "https://1722.3cx.cloud",
  },
  {
    label: "Network HQ",
    value: "Nest phone + SIP map",
    href: "https://copress-dashboard.vercel.app/network",
  },
] as const;

export function activeOpsAlerts() {
  return OPS_ALERTS.filter((alert) => alert.severity !== "ok");
}
