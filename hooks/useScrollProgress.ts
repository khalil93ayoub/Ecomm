"use client";

import { type RefObject, useEffect, useState } from "react";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function useScrollProgress(ref: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const targetElement = element;
    let frameId = 0;

    function updateProgress() {
      const rect = targetElement.getBoundingClientRect();
      const travel = window.innerHeight + rect.height;
      const nextProgress = clamp((window.innerHeight - rect.top) / travel, 0, 1);

      setProgress(nextProgress);
    }

    function handleScroll() {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(updateProgress);
    }

    updateProgress();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [ref]);

  return progress;
}
