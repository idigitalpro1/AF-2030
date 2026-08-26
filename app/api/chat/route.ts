import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from "ai";
import { projectCatalogForPrompt } from "@/lib/projects";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: "anthropic/claude-sonnet-4.5",
    system: `You are Vercel Shop Desk, the engineering twin to Nest (copress-dashboard / admin.copress.news).
Nest owns publishing ops (editorial, newsletter, network, academy).
You own multi-project Vercel development: prioritize deploys, agents, templates, brand apps, and SATCOM finished handoffs.
Be concise and practical. Prefer short lists. When helpful, point operators back to Nest surfaces.

Fleet:
${projectCatalogForPrompt()}`,
    messages: await convertToModelMessages(messages),
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}
