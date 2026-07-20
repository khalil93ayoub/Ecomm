"use client";

import { useEffect, useRef, type HTMLAttributes, type ReactNode } from "react";

import { loadGsap } from "@/lib/animations/gsap";
import { cn } from "@/lib/utils/cn";

type HeroEntranceTimelineProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function HeroEntranceTimeline({
  children,
  className,
  ...props
}: HeroEntranceTimelineProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rootElement = rootRef.current;

    if (!rootElement) {
      return;
    }

    const animationRoot = rootElement as HTMLDivElement;
    let hasPlayed = false;
    let fallbackTimer = 0;
    let context: { revert: () => void } | null = null;

    async function playEntrance() {
      if (hasPlayed) {
        return;
      }

      hasPlayed = true;
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        animationRoot.querySelectorAll<HTMLElement>("[data-hero-enter]").forEach((item) => {
          item.style.opacity = "1";
          item.style.transform = "none";
          item.style.visibility = "visible";
        });
        return;
      }

      const gsap = await loadGsap();

      context = gsap.context(() => {
        const items = gsap.utils.toArray<HTMLElement>("[data-hero-enter]");

        gsap
          .timeline({
            defaults: {
              duration: 0.76,
              ease: "power3.out",
            },
          })
          .fromTo(
            items,
            {
              autoAlpha: 0.82,
              y: 10,
            },
            {
            autoAlpha: 1,
            stagger: 0.09,
            y: 0,
            },
          );
      }, animationRoot);
    }

    function handleSceneReady() {
      void playEntrance();
    }

    window.addEventListener("novara:hero-3d-ready", handleSceneReady);
    fallbackTimer = window.setTimeout(() => {
      void playEntrance();
    }, 900);

    return () => {
      window.removeEventListener("novara:hero-3d-ready", handleSceneReady);
      window.clearTimeout(fallbackTimer);
      context?.revert();
    };
  }, []);

  return (
    <div className={cn(className)} ref={rootRef} {...props}>
      {children}
    </div>
  );
}
