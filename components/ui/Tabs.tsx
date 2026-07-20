"use client";

import type { ReactNode } from "react";
import { useState } from "react";

import { Button } from "@/components/ui/Button";

type Tab = {
  id: string;
  label: string;
  content: ReactNode;
};

type TabsProps = {
  tabs: Tab[];
  defaultTabId?: string;
};

export function Tabs({ defaultTabId, tabs }: TabsProps) {
  const firstTab = tabs[0];
  const [activeTabId, setActiveTabId] = useState(defaultTabId ?? firstTab?.id);
  const activeTab = tabs.find((tab) => tab.id === activeTabId) ?? firstTab;

  if (!activeTab) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2" role="tablist">
        {tabs.map((tab) => (
          <Button
            aria-selected={tab.id === activeTab.id}
            key={tab.id}
            onClick={() => setActiveTabId(tab.id)}
            role="tab"
            variant={tab.id === activeTab.id ? "primary" : "secondary"}
          >
            {tab.label}
          </Button>
        ))}
      </div>
      <div role="tabpanel">{activeTab.content}</div>
    </div>
  );
}
