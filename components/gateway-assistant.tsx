"use client";

import { useChat } from "@ai-sdk/react";
import { useState, type FormEvent } from "react";

function messageText(message: {
  parts?: Array<{ type: string; text?: string }>;
  content?: string;
}): string {
  if (message.parts?.length) {
    return message.parts
      .filter((part) => part.type === "text" && part.text)
      .map((part) => part.text ?? "")
      .join("");
  }
  return typeof message.content === "string" ? message.content : "";
}

export function GatewayAssistant() {
  const { messages, sendMessage, status, error, stop } = useChat();
  const [input, setInput] = useState("");
  const busy = status === "submitted" || status === "streaming";

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const text = input.trim();
    if (!text || busy) return;
    setInput("");
    await sendMessage({ text });
  }

  return (
    <section className="assistant" aria-label="AI Gateway assistant">
      <header className="assistant__head">
        <div>
          <p className="eyebrow">AI Gateway</p>
          <h2>Ask about the stack</h2>
        </div>
        <span className="assistant__pulse" aria-hidden />
      </header>

      <div className="assistant__thread" role="log" aria-live="polite">
        {messages.length === 0 ? (
          <p className="assistant__empty">
            Ask which projects to ship next, compare templates, or draft a
            launch plan for today&apos;s AI Gateway builds.
          </p>
        ) : (
          messages.map((message) => (
            <article
              key={message.id}
              className={`bubble bubble--${message.role}`}
            >
              <span className="bubble__role">
                {message.role === "user" ? "You" : "Gateway"}
              </span>
              <p>{messageText(message)}</p>
            </article>
          ))
        )}
        {error ? (
          <p className="assistant__error" role="alert">
            {error.message || "Chat failed. Check AI Gateway credentials."}
          </p>
        ) : null}
      </div>

      <div className="assistant__prompts">
        {[
          "Rank the top 3 to ship this week",
          "What should we do with today's templates?",
          "Compare vibe-coding-platform vs chatbot",
        ].map((prompt) => (
          <button
            key={prompt}
            type="button"
            className="chip"
            disabled={busy}
            onClick={() => {
              void sendMessage({ text: prompt });
            }}
          >
            {prompt}
          </button>
        ))}
      </div>

      <form className="assistant__form" onSubmit={onSubmit}>
        <label className="sr-only" htmlFor="gateway-prompt">
          Message Gateway Desk
        </label>
        <input
          id="gateway-prompt"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask Gateway Desk…"
          autoComplete="off"
        />
        {busy ? (
          <button type="button" className="btn btn--ghost" onClick={() => stop()}>
            Stop
          </button>
        ) : (
          <button type="submit" className="btn" disabled={!input.trim()}>
            Send
          </button>
        )}
      </form>
    </section>
  );
}
