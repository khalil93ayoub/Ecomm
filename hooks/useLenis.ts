"use client";

import { useEffect } from "react";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { loadLenis } from "@/lib/animations/lenis";

export function useLenis(enabled = true) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!enabled || prefersReducedMotion) {
      return;
    }

    let destroy: (() => void) | undefined;
    let isCancelled = false;

    async function setupLenis() {
      const Lenis = await loadLenis();

      if (isCancelled) {
        return;
      }

      const lenis = new Lenis({
        anchors: true,
        duration: 0.95,
        easing: (time: number) => Math.min(1, 1.001 - 2 ** (-10 * time)),
        smoothWheel: true,
        syncTouch: false,
      });
      let frameId = 0;

      function raf(time: number) {
        lenis.raf(time);
        frameId = requestAnimationFrame(raf);
      }

      frameId = requestAnimationFrame(raf);
      destroy = () => {
        cancelAnimationFrame(frameId);
        lenis.destroy();
      };
    }

    setupLenis();

    return () => {
      isCancelled = true;
      destroy?.();
    };
  }, [enabled, prefersReducedMotion]);
}
