"use client";

import { useEffect, useState } from "react";

type DeviceCapability = "checking" | "capable" | "low-power";

type NavigatorWithMemory = Navigator & {
  deviceMemory?: number;
  connection?: {
    saveData?: boolean;
  };
};

export function useDeviceCapability(minDesktopWidth = 900) {
  const [capability, setCapability] = useState<DeviceCapability>("checking");

  useEffect(() => {
    let resizeFrameId = 0;

    function resolveCapability() {
      const navigatorWithMemory = navigator as NavigatorWithMemory;
      const isSmallScreen = window.matchMedia(`(max-width: ${minDesktopWidth - 1}px)`).matches;
      const hasCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
      const isDataSaver = navigatorWithMemory.connection?.saveData === true;
      const isLowPower = isDataSaver || (isSmallScreen && hasCoarsePointer);

      setCapability(isLowPower ? "low-power" : "capable");
    }

    function handleResize() {
      window.cancelAnimationFrame(resizeFrameId);
      resizeFrameId = window.requestAnimationFrame(resolveCapability);
    }

    const frameId = requestAnimationFrame(() => {
      resolveCapability();
    });

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.cancelAnimationFrame(resizeFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [minDesktopWidth]);

  return capability;
}
