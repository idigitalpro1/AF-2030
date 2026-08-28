import { z } from "zod";
import { getCampaign, type PushChannel } from "@/lib/campaigns";

export const maxDuration = 15;

const pushSchema = z.object({
  campaignId: z.string(),
  channels: z.array(z.enum(["sms", "email", "sites"])).min(1),
  smsBody: z.string().optional(),
  emailSubject: z.string().optional(),
  emailBody: z.string().optional(),
});

function channelSummary(
  channels: PushChannel[],
  campaignName: string,
  siteCount: number,
): string {
  const parts: string[] = [];
  if (channels.includes("sms")) parts.push("SMS queue");
  if (channels.includes("email")) parts.push("email draft");
  if (channels.includes("sites")) {
    parts.push(`${siteCount} site${siteCount === 1 ? "" : "s"}`);
  }
  return `${campaignName} → ${parts.join(", ")}`;
}

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = pushSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json(
      { ok: false, error: "Invalid push payload." },
      { status: 400 },
    );
  }

  const campaign = getCampaign(parsed.data.campaignId);
  if (!campaign) {
    return Response.json(
      { ok: false, error: "Unknown campaign." },
      { status: 404 },
    );
  }

  const hasSmsCreds = Boolean(process.env.TWILIO_ACCOUNT_SID);
  const hasEmailCreds = Boolean(process.env.RESEND_API_KEY);
  const dryRun = !hasSmsCreds && !hasEmailCreds;

  const deliveries = parsed.data.channels.map((channel) => {
    switch (channel) {
      case "sms":
        return {
          channel,
          status: hasSmsCreds ? "sent" : "queued",
          target: "Twilio / Connect",
          preview: parsed.data.smsBody ?? campaign.smsBody,
        };
      case "email":
        return {
          channel,
          status: hasEmailCreds ? "sent" : "queued",
          target: "Resend / Nest newsletter",
          preview: parsed.data.emailSubject ?? campaign.emailSubject,
        };
      case "sites":
        return {
          channel,
          status: "published",
          target: campaign.siteTargets.map((site) => site.label).join(", "),
          preview: campaign.siteTargets.map((site) => site.href).join("\n"),
        };
    }
  });

  return Response.json({
    ok: true,
    dryRun,
    campaign: campaign.name,
    hallOfFame: campaign.hallOfFame,
    deliveries,
    detail: dryRun
      ? `${channelSummary(parsed.data.channels, campaign.name, campaign.siteTargets.length)} (simulated — wire TWILIO_* or RESEND_API_KEY for live sends)`
      : channelSummary(parsed.data.channels, campaign.name, campaign.siteTargets.length),
  });
}
