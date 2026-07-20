"use client";

import { useCallback, useState, type PointerEvent } from "react";

type PointerVector = {
  x: number;
  y: number;
};

function supportsFinePointer() {
  return typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;
}

export function usePointerParallax(intensity = 1) {
  const [pointer, setPointer] = useState<PointerVector>({ x: 0, y: 0 });

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      if (!supportsFinePointer()) {
        return;
      }

      const rect = event.currentTarget.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * -2;

      setPointer({
        x: x * intensity,
        y: y * intensity,
      });
    },
    [intensity],
  );

  const resetPointer = useCallback(() => {
    setPointer({ x: 0, y: 0 });
  }, []);

  return {
    pointer,
    pointerHandlers: {
      onPointerLeave: resetPointer,
      onPointerMove: handlePointerMove,
    },
    resetPointer,
  };
}
