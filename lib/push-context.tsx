"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  CAMPAIGNS,
  getCampaign,
  type Campaign,
  type PushChannel,
} from "@/lib/campaigns";

export type PushActivity = {
  id: string;
  campaignId: string;
  campaignName: string;
  channels: PushChannel[];
  status: "queued" | "sent" | "failed";
  detail: string;
  timestamp: number;
};

export type ChatCenterPanel = "chat" | "push" | "activity";

type PushContextValue = {
  campaigns: Campaign[];
  selectedCampaign: Campaign;
  selectCampaign: (id: string) => void;
  channels: PushChannel[];
  toggleChannel: (channel: PushChannel) => void;
  setChannels: (channels: PushChannel[]) => void;
  smsBody: string;
  setSmsBody: (value: string) => void;
  emailSubject: string;
  setEmailSubject: (value: string) => void;
  emailBody: string;
  setEmailBody: (value: string) => void;
  activity: PushActivity[];
  panel: ChatCenterPanel;
  setPanel: (panel: ChatCenterPanel) => void;
  openPushForCampaign: (campaignId: string) => void;
  pushOut: () => Promise<void>;
  pushing: boolean;
  pushError: string | null;
};

const PushContext = createContext<PushContextValue | null>(null);

const DEFAULT_CAMPAIGN = CAMPAIGNS[0]!;

export function PushProvider({ children }: { children: ReactNode }) {
  const [selectedId, setSelectedId] = useState(DEFAULT_CAMPAIGN.id);
  const [channels, setChannelsState] = useState<PushChannel[]>(
    DEFAULT_CAMPAIGN.defaultChannels,
  );
  const [smsBody, setSmsBody] = useState(DEFAULT_CAMPAIGN.smsBody);
  const [emailSubject, setEmailSubject] = useState(DEFAULT_CAMPAIGN.emailSubject);
  const [emailBody, setEmailBody] = useState(DEFAULT_CAMPAIGN.emailBody);
  const [activity, setActivity] = useState<PushActivity[]>([]);
  const [panel, setPanel] = useState<ChatCenterPanel>("chat");
  const [pushing, setPushing] = useState(false);
  const [pushError, setPushError] = useState<string | null>(null);

  const selectedCampaign = getCampaign(selectedId) ?? DEFAULT_CAMPAIGN;

  const selectCampaign = useCallback((id: string) => {
    const campaign = getCampaign(id);
    if (!campaign) return;
    setSelectedId(id);
    setChannelsState(campaign.defaultChannels);
    setSmsBody(campaign.smsBody);
    setEmailSubject(campaign.emailSubject);
    setEmailBody(campaign.emailBody);
    setPushError(null);
  }, []);

  const toggleChannel = useCallback((channel: PushChannel) => {
    setChannelsState((current) =>
      current.includes(channel)
        ? current.filter((item) => item !== channel)
        : [...current, channel],
    );
  }, []);

  const setChannels = useCallback((next: PushChannel[]) => {
    setChannelsState(next);
  }, []);

  const openPushForCampaign = useCallback(
    (campaignId: string) => {
      selectCampaign(campaignId);
      setPanel("push");
    },
    [selectCampaign],
  );

  const pushOut = useCallback(async () => {
    if (channels.length === 0) {
      setPushError("Select at least one channel — SMS, email, or sites.");
      return;
    }

    setPushing(true);
    setPushError(null);

    const entryId = crypto.randomUUID();
    setActivity((current) => [
      {
        id: entryId,
        campaignId: selectedCampaign.id,
        campaignName: selectedCampaign.name,
        channels: [...channels],
        status: "queued",
        detail: "Routing to Nest connectors…",
        timestamp: Date.now(),
      },
      ...current,
    ]);
    setPanel("activity");

    try {
      const response = await fetch("/dev/api/push", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          campaignId: selectedCampaign.id,
          channels,
          smsBody,
          emailSubject,
          emailBody,
        }),
      });

      const payload = (await response.json()) as {
        ok: boolean;
        detail?: string;
        error?: string;
      };

      if (!response.ok || !payload.ok) {
        throw new Error(payload.error ?? "Push failed");
      }

      setActivity((current) =>
        current.map((item) =>
          item.id === entryId
            ? {
                ...item,
                status: "sent",
                detail: payload.detail ?? "Delivered to selected channels.",
              }
            : item,
        ),
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : "Push failed";
      setPushError(message);
      setActivity((current) =>
        current.map((item) =>
          item.id === entryId
            ? { ...item, status: "failed", detail: message }
            : item,
        ),
      );
    } finally {
      setPushing(false);
    }
  }, [
    channels,
    emailBody,
    emailSubject,
    selectedCampaign.id,
    selectedCampaign.name,
    smsBody,
  ]);

  const value = useMemo<PushContextValue>(
    () => ({
      campaigns: CAMPAIGNS,
      selectedCampaign,
      selectCampaign,
      channels,
      toggleChannel,
      setChannels,
      smsBody,
      setSmsBody,
      emailSubject,
      setEmailSubject,
      emailBody,
      setEmailBody,
      activity,
      panel,
      setPanel,
      openPushForCampaign,
      pushOut,
      pushing,
      pushError,
    }),
    [
      activity,
      channels,
      emailBody,
      emailSubject,
      openPushForCampaign,
      panel,
      pushError,
      pushOut,
      pushing,
      selectCampaign,
      selectedCampaign,
      smsBody,
      toggleChannel,
    ],
  );

  return <PushContext.Provider value={value}>{children}</PushContext.Provider>;
}

export function usePush() {
  const context = useContext(PushContext);
  if (!context) {
    throw new Error("usePush must be used within PushProvider");
  }
  return context;
}
