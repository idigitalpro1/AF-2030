import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from "ai";
import { campaignsForPrompt } from "@/lib/campaigns";
import { activeOpsAlerts } from "@/lib/ops-status";
import { projectCatalogForPrompt } from "@/lib/projects";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: "anthropic/claude-sonnet-4.5",
    system: `You are Vercel Shop Desk Chat Center — the engineering twin to Nest (copress-dashboard / admin.copress.news).
Nest owns publishing ops (editorial, newsletter, network, academy).
You own multi-project Vercel development AND campaign push ops: draft SMS (160 chars when possible), email subject/body, and site syndication copy for Hall of Fame and any shop campaign.
Be concise and practical. Prefer short lists. When drafting push copy, label sections SMS / EMAIL / SITES. When helpful, point operators back to Nest surfaces.

Fleet:
${projectCatalogForPrompt()}

Campaigns (push targets):
${campaignsForPrompt()}`,
    messages: await convertToModelMessages(messages),
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}
