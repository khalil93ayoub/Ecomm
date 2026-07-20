"use client";

import { useEffect } from "react";

type HeaderScrollTransitionProps = {
  targetId: string;
};

export function HeaderScrollTransition({ targetId }: HeaderScrollTransitionProps) {
  useEffect(() => {
    const header = document.getElementById(targetId);

    if (!header) {
      return;
    }

    const targetHeader = header;
    let frameId = 0;

    function updateHeaderState() {
      targetHeader.classList.toggle("is-scrolled", window.scrollY > 12);
    }

    function handleScroll() {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(updateHeaderState);
    }

    updateHeaderState();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [targetId]);

  return null;
}
