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
    <section className="assistant" aria-label="Shop desk AI assistant">
      <header className="assistant__head">
        <div>
          <p className="eyebrow">AI Gateway</p>
          <h2>Shop desk</h2>
        </div>
        <span className="assistant__pulse" aria-hidden />
      </header>

      <div className="assistant__thread" role="log" aria-live="polite">
        {messages.length === 0 ? (
          <p className="assistant__empty">
            Ask which Vercel projects to ship next, how they pair with Nest /
            admin.copress.news, or what belongs in SATCOM finished.
          </p>
        ) : (
          messages.map((message) => (
            <article
              key={message.id}
              className={`bubble bubble--${message.role}`}
            >
              <span className="bubble__role">
                {message.role === "user" ? "You" : "Shop"}
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
          "What should ship next for Nest?",
          "List publishing vs agent projects",
          "What belongs in SATCOM finished?",
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
        <label className="sr-only" htmlFor="shop-prompt">
          Message Shop Desk
        </label>
        <input
          id="shop-prompt"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask Shop Desk…"
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
