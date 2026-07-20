"use client";

import { useRef, type ReactNode } from "react";

import { HomeBrandSceneExperience } from "@/components/three/HomeBrandSceneExperience";

type HomeCinematicStageProps = {
  children: ReactNode;
};

export function HomeCinematicStage({ children }: HomeCinematicStageProps) {
  const stageRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative isolate overflow-hidden bg-novara-black text-white" ref={stageRef}>
      <div className="pointer-events-none sticky top-[var(--header-height)] z-0 h-[calc(100svh-var(--header-height))] min-h-[540px]">
        <HomeBrandSceneExperience scrollRootRef={stageRef} />
      </div>
      <div className="relative z-10 -mt-[calc(100svh-var(--header-height))] min-h-[calc(100svh-var(--header-height))]">
        {children}
      </div>
    </div>
  );
}
