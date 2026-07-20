"use client";

import type { RefObject } from "react";

import { EnvironmentExperience } from "@/components/environment/EnvironmentExperience";

type HomeBrandSceneExperienceProps = {
  scrollRootRef: RefObject<HTMLElement | null>;
};

export function HomeBrandSceneExperience({ scrollRootRef }: HomeBrandSceneExperienceProps) {
  return <EnvironmentExperience readyEventName="novara:hero-3d-ready" scrollRootRef={scrollRootRef} />;
}
