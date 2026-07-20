"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { MathUtils, PointLight } from "three";

import { environmentConfig } from "@/lib/three/environment-config";

type EnvironmentCursorLightProps = {
  pointer: {
    x: number;
    y: number;
  };
  pointerInfluence: number;
};

export function EnvironmentCursorLight({ pointer, pointerInfluence }: EnvironmentCursorLightProps) {
  const lightRef = useRef<PointLight>(null);

  useFrame((_state, delta) => {
    const light = lightRef.current;

    if (!light) {
      return;
    }

    const cursor = environmentConfig.lighting.cursor;
    const ease = 1 - Math.exp(-5.4 * delta);
    const targetX = cursor.position[0] + pointer.x * cursor.range.x * pointerInfluence;
    const targetY = cursor.position[1] + pointer.y * cursor.range.y * pointerInfluence;

    light.position.x = MathUtils.lerp(light.position.x, targetX, ease);
    light.position.y = MathUtils.lerp(light.position.y, targetY, ease);
    light.position.z = MathUtils.lerp(light.position.z, cursor.position[2], ease);
    light.intensity = MathUtils.lerp(light.intensity, cursor.intensity * pointerInfluence, ease);
  });

  return (
    <pointLight
      color={environmentConfig.lighting.cursor.color}
      distance={6.4}
      intensity={0}
      position={environmentConfig.lighting.cursor.position}
      ref={lightRef}
    />
  );
}
