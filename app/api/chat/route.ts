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
    system: `You are Gateway Desk, an assistant for the 5Star top development projects dashboard.
Help the user prioritize, compare, and ship the projects below.
Be concise, practical, and specific. Prefer short paragraphs and bullet lists.
When ranking, weigh shipping velocity, AI leverage, and business impact.

Top development projects:
${projectCatalogForPrompt()}`,
    messages: await convertToModelMessages(messages),
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}
