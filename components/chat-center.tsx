"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useMemo, useState, type FormEvent } from "react";
import { PUSH_CHANNELS } from "@/lib/campaigns";
import { usePush, type ChatCenterPanel } from "@/lib/push-context";

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

const PANELS: Array<{ id: ChatCenterPanel; label: string }> = [
  { id: "chat", label: "Chat" },
  { id: "push", label: "Push" },
  { id: "activity", label: "Activity" },
];

function formatTime(timestamp: number) {
  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
  }).format(timestamp);
}

export function ChatCenter() {
  const {
    campaigns,
    selectedCampaign,
    selectCampaign,
    channels,
    toggleChannel,
    smsBody,
    setSmsBody,
    emailSubject,
    setEmailSubject,
    emailBody,
    setEmailBody,
    activity,
    panel,
    setPanel,
    pushOut,
    pushing,
    pushError,
  } = usePush();

  const { messages, sendMessage, status, error, stop } = useChat({
    transport: new DefaultChatTransport({ api: "/dev/api/chat" }),
  });
  const [input, setInput] = useState("");
  const busy = status === "submitted" || status === "streaming";

  const chatPrompts = useMemo(
    () => [
      `Draft SMS for ${selectedCampaign.name}`,
      `Write email subject for ${selectedCampaign.name}`,
      "Which campaigns belong in Hall of Fame?",
      "Push plan for SATCOM finished cards",
    ],
    [selectedCampaign.name],
  );

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const text = input.trim();
    if (!text || busy) return;
    setInput("");
    await sendMessage({ text });
  }

  return (
    <section className="chat-center" aria-label="Shop desk chat center">
      <header className="chat-center__head">
        <div>
          <p className="eyebrow">Command center</p>
          <h2>Chat + Push</h2>
        </div>
        <span className="chat-center__pulse" aria-hidden />
      </header>

      <div className="chat-center__tabs" role="tablist" aria-label="Chat center panels">
        {PANELS.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={panel === item.id}
            className={panel === item.id ? "chip chip--active" : "chip"}
            onClick={() => setPanel(item.id)}
          >
            {item.label}
            {item.id === "activity" && activity.length > 0 ? (
              <span className="chat-center__badge">{activity.length}</span>
            ) : null}
          </button>
        ))}
      </div>

      {panel === "chat" ? (
        <>
          <div className="chat-center__context">
            <label className="chat-center__label" htmlFor="chat-campaign">
              Campaign context
            </label>
            <select
              id="chat-campaign"
              className="chat-center__select"
              value={selectedCampaign.id}
              onChange={(event) => selectCampaign(event.target.value)}
            >
              {campaigns.map((campaign) => (
                <option key={campaign.id} value={campaign.id}>
                  {campaign.hallOfFame ? "★ " : ""}
                  {campaign.name}
                </option>
              ))}
            </select>
            <p className="chat-center__hint">{selectedCampaign.blurb}</p>
          </div>

          <div className="chat-center__thread" role="log" aria-live="polite">
            {messages.length === 0 ? (
              <p className="assistant__empty">
                Ask Shop Desk to draft SMS, email, or site copy for Hall of Fame
                and campaign cards — or plan multi-channel push runs.
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
            {chatPrompts.map((prompt) => (
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
        </>
      ) : null}

      {panel === "push" ? (
        <div className="chat-center__push">
          <div className="chat-center__context">
            <label className="chat-center__label" htmlFor="push-campaign">
              Push campaign
            </label>
            <select
              id="push-campaign"
              className="chat-center__select"
              value={selectedCampaign.id}
              onChange={(event) => selectCampaign(event.target.value)}
            >
              {campaigns.map((campaign) => (
                <option key={campaign.id} value={campaign.id}>
                  {campaign.hallOfFame ? "★ Hall of Fame · " : ""}
                  {campaign.name}
                </option>
              ))}
            </select>
          </div>

          <fieldset className="chat-center__channels">
            <legend className="chat-center__label">Channels</legend>
            <div className="chat-center__channel-grid">
              {PUSH_CHANNELS.map((channel) => {
                const active = channels.includes(channel.id);
                return (
                  <label
                    key={channel.id}
                    className={`chat-center__channel${active ? " chat-center__channel--on" : ""}`}
                  >
                    <input
                      type="checkbox"
                      checked={active}
                      onChange={() => toggleChannel(channel.id)}
                    />
                    <span className="chat-center__channel-label">{channel.label}</span>
                    <span className="chat-center__channel-hint">{channel.hint}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          {channels.includes("sms") ? (
            <label className="chat-center__field">
              <span className="chat-center__label">SMS body</span>
              <textarea
                rows={3}
                value={smsBody}
                onChange={(event) => setSmsBody(event.target.value)}
              />
            </label>
          ) : null}

          {channels.includes("email") ? (
            <>
              <label className="chat-center__field">
                <span className="chat-center__label">Email subject</span>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(event) => setEmailSubject(event.target.value)}
                />
              </label>
              <label className="chat-center__field">
                <span className="chat-center__label">Email body</span>
                <textarea
                  rows={4}
                  value={emailBody}
                  onChange={(event) => setEmailBody(event.target.value)}
                />
              </label>
            </>
          ) : null}

          {channels.includes("sites") ? (
            <div className="chat-center__sites">
              <p className="chat-center__label">Site targets</p>
              <ul>
                {selectedCampaign.siteTargets.map((site) => (
                  <li key={site.href}>
                    <strong>{site.label}</strong>
                    <a href={site.href} target="_blank" rel="noreferrer">
                      {site.href.replace(/^https?:\/\//, "")}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {pushError ? (
            <p className="assistant__error" role="alert">
              {pushError}
            </p>
          ) : null}

          <div className="chat-center__push-actions">
            <button
              type="button"
              className="btn btn--wide"
              disabled={pushing || channels.length === 0}
              onClick={() => {
                void pushOut();
              }}
            >
              {pushing ? "Pushing…" : "Push out"}
            </button>
            <button
              type="button"
              className="btn btn--ghost btn--wide"
              onClick={() => setPanel("chat")}
            >
              Draft with AI
            </button>
          </div>
        </div>
      ) : null}

      {panel === "activity" ? (
        <div className="chat-center__activity">
          {activity.length === 0 ? (
            <p className="assistant__empty">
              Push activity will appear here — Hall of Fame, SATCOM finished cards,
              and any campaign routed to SMS, email, or sites.
            </p>
          ) : (
            <ul className="chat-center__activity-list">
              {activity.map((item) => (
                <li key={item.id} className={`chat-center__activity-item chat-center__activity-item--${item.status}`}>
                  <div className="chat-center__activity-top">
                    <strong>{item.campaignName}</strong>
                    <time dateTime={new Date(item.timestamp).toISOString()}>
                      {formatTime(item.timestamp)}
                    </time>
                  </div>
                  <p className="chat-center__activity-channels">
                    {item.channels.map((channel) => channel.toUpperCase()).join(" · ")}
                  </p>
                  <p>{item.detail}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </section>
  );
}
