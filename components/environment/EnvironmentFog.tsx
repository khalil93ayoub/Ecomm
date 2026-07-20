"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { FogExp2, MathUtils } from "three";

import { environmentConfig, type EnvironmentQuality } from "@/lib/three/environment-config";

type EnvironmentFogProps = {
  quality: EnvironmentQuality;
  scrollProgress: number;
};

export function EnvironmentFog({ quality, scrollProgress }: EnvironmentFogProps) {
  const fogRef = useRef<FogExp2>(null);

  useFrame((_state, delta) => {
    const fog = fogRef.current;

    if (!fog) {
      return;
    }

    const targetDensity =
      environmentConfig.fog.density[quality] +
      MathUtils.smootherstep(scrollProgress, 0.18, 0.86) * environmentConfig.fog.scrollDensityBoost;
    const ease = 1 - Math.exp(-3.2 * delta);

    fog.density = MathUtils.lerp(fog.density, targetDensity, ease);
  });

  return (
    <fogExp2
      args={[environmentConfig.fog.color, environmentConfig.fog.density[quality]]}
      attach="fog"
      ref={fogRef}
    />
  );
}
