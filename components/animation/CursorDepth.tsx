"use client";

import type { CSSProperties, PointerEvent, ReactNode } from "react";
import { useCallback, useRef } from "react";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils/cn";

type CursorDepthProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

export function CursorDepth({ children, className, strength = 10 }: CursorDepthProps) {
  const prefersReducedMotion = useReducedMotion();
  const contentRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || !window.matchMedia("(pointer: fine)").matches) {
        return;
      }

      const element = event.currentTarget;
      const rect = element.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * strength;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * strength;

      if (contentRef.current) {
        contentRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
    },
    [prefersReducedMotion, strength],
  );

  const handlePointerLeave = useCallback(() => {
    if (contentRef.current) {
      contentRef.current.style.transform = "translate3d(0, 0, 0)";
    }
  }, []);

  return (
    <div className={cn("relative", className)} onPointerLeave={handlePointerLeave} onPointerMove={handlePointerMove}>
      <div
        className="h-full w-full transition-transform duration-500 ease-[var(--ease-premium)] motion-reduce:transform-none motion-reduce:transition-none"
        ref={contentRef}
        style={{ willChange: "transform" } satisfies CSSProperties}
      >
        {children}
      </div>
    </div>
  );
}
