"use client";

import { type RefObject, useEffect, useState } from "react";

type UseSceneVisibilityOptions = {
  initialHasEnteredViewport?: boolean;
  initialIsVisible?: boolean;
  rootMargin?: string;
  threshold?: number;
};

export function useSceneVisibility(
  ref: RefObject<Element | null>,
  {
    initialHasEnteredViewport = false,
    initialIsVisible = false,
    rootMargin = "520px",
    threshold = 0,
  }: UseSceneVisibilityOptions = {},
) {
  const [hasEnteredViewport, setHasEnteredViewport] = useState(initialHasEnteredViewport);
  const [isVisible, setIsVisible] = useState(initialIsVisible);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const nextIsVisible = entry?.isIntersecting ?? false;

        setIsVisible(nextIsVisible);

        if (nextIsVisible) {
          setHasEnteredViewport(true);
        }
      },
      {
        rootMargin,
        threshold,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [ref, rootMargin, threshold]);

  return {
    hasEnteredViewport,
    isVisible,
  };
}
