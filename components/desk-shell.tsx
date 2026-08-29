"use client";

import { PushProvider } from "@/lib/push-context";
import { ChatCenter } from "@/components/chat-center";
import { NestBridge } from "@/components/nest-bridge";
import { ProjectBoard } from "@/components/project-board";

export function DeskShell() {
  return (
    <PushProvider>
      <div className="layout">
        <div className="layout__main">
          <ProjectBoard />
        </div>
        <div className="layout__side">
          <NestBridge />
          <ChatCenter />
        </div>
      </div>
    </PushProvider>
  );
}
