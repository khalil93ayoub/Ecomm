"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState, type RefObject } from "react";

import { EnvironmentFallback } from "@/components/environment/EnvironmentFallback";
import { SceneErrorBoundary } from "@/components/three/SceneErrorBoundary";
import { useDeviceCapability } from "@/hooks/useDeviceCapability";
import { useReducedMotionPreference } from "@/hooks/useReducedMotionPreference";
import { useSceneVisibility } from "@/hooks/useSceneVisibility";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useWebGLSupport } from "@/hooks/useWebGLSupport";
import { environmentConfig, type EnvironmentQuality } from "@/lib/three/environment-config";

const LazyEnvironmentScene = dynamic(
  () => import("@/components/environment/EnvironmentScene").then((module) => module.EnvironmentScene),
  {
    loading: () => null,
    ssr: false,
  },
);

type EnvironmentExperienceProps = {
  readyEventName?: string;
  scrollRootRef: RefObject<HTMLElement | null>;
};

function useWindowPointerVector(enabled: boolean) {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled || !window.matchMedia("(pointer: fine)").matches) {
      const frameId = window.requestAnimationFrame(() => setPointer({ x: 0, y: 0 }));

      return () => window.cancelAnimationFrame(frameId);
    }

    function handlePointerMove(event: PointerEvent) {
      setPointer({
        x: (event.clientX / window.innerWidth - 0.5) * 2,
        y: (event.clientY / window.innerHeight - 0.5) * -2,
      });
    }

    function handlePointerLeave() {
      setPointer({ x: 0, y: 0 });
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("mouseleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, [enabled]);

  return pointer;
}

function dispatchReadyEvent(readyEventName?: string) {
  if (!readyEventName) {
    return;
  }

  window.dispatchEvent(new CustomEvent(readyEventName));
}

export function EnvironmentExperience({
  readyEventName,
  scrollRootRef,
}: EnvironmentExperienceProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);
  const [isCanvasMounted, setIsCanvasMounted] = useState(false);
  const scrollProgress = useScrollProgress(scrollRootRef);
  const webGLSupport = useWebGLSupport();
  const capability = useDeviceCapability(environmentConfig.capability.breakpoint);
  const prefersReducedMotion = useReducedMotionPreference();
  const { hasEnteredViewport, isVisible } = useSceneVisibility(sceneRef, {
    initialHasEnteredViewport: true,
    initialIsVisible: true,
    rootMargin: "720px",
  });
  const quality: EnvironmentQuality = capability === "low-power" ? "low" : "standard";
  const fallbackReason = hasFailed
    ? "scene-error"
    : prefersReducedMotion
      ? "reduced-motion"
      : webGLSupport === "unsupported"
        ? "webgl-unavailable"
        : !hasEnteredViewport
          ? "waiting-for-viewport"
          : webGLSupport === "checking" || capability === "checking"
            ? "capability-check"
            : "none";
  const canLoadScene =
    hasEnteredViewport &&
    !hasFailed &&
    !prefersReducedMotion &&
    webGLSupport === "supported" &&
    capability !== "checking";
  const pointerInfluence =
    canLoadScene && capability === "capable" ? environmentConfig.motion.cursorInfluence : 0;
  const pointer = useWindowPointerVector(pointerInfluence > 0);

  const handleReady = useCallback(() => {
    setIsReady(true);
    dispatchReadyEvent(readyEventName);
  }, [readyEventName]);

  const handleSceneError = useCallback(() => {
    setHasFailed(true);
    setIsReady(false);
  }, []);

  useEffect(() => {
    if (canLoadScene) {
      return;
    }

    const timer = window.setTimeout(() => dispatchReadyEvent(readyEventName), 150);

    return () => window.clearTimeout(timer);
  }, [canLoadScene, readyEventName]);

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0"
      data-canvas-mounted={isCanvasMounted ? "true" : "false"}
      data-environment-quality={quality}
      data-fallback-reason={fallbackReason}
      data-scene-state={isReady ? "ready" : canLoadScene ? "loading" : "fallback"}
      ref={sceneRef}
    >
      <EnvironmentFallback isDimmed={isReady} />
      {canLoadScene ? (
        <SceneErrorBoundary onError={handleSceneError}>
          <div className="absolute inset-0 transition-opacity duration-700" style={{ opacity: isReady ? 1 : 0 }}>
            <LazyEnvironmentScene
              isVisible={isVisible}
              onCanvasMounted={() => setIsCanvasMounted(true)}
              onReady={handleReady}
              pointer={pointer}
              pointerInfluence={pointerInfluence}
              quality={quality}
              scrollProgress={scrollProgress}
            />
          </div>
        </SceneErrorBoundary>
      ) : null}
    </div>
  );
}
