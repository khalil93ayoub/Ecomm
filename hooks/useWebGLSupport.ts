"use client";

import { useEffect, useState } from "react";

type WebGLSupport = "checking" | "supported" | "unsupported";

export function useWebGLSupport() {
  const [support, setSupport] = useState<WebGLSupport>("checking");

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      const canvas = document.createElement("canvas");
      const context =
        canvas.getContext("webgl2") ??
        canvas.getContext("webgl") ??
        canvas.getContext("experimental-webgl");

      setSupport(context ? "supported" : "unsupported");
    });

    return () => cancelAnimationFrame(frameId);
  }, []);

  return support;
}
