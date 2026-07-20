"use client";

import { type RefObject, useEffect, useState } from "react";

type UseInViewOptions = {
  rootMargin?: string;
  threshold?: number;
};

export function useInView(
  ref: RefObject<Element | null>,
  { rootMargin = "360px", threshold = 0 }: UseInViewOptions = {},
) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsInView(true);
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

  return isInView;
}
