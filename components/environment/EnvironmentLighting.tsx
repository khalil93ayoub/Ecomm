"use client";

import { environmentConfig } from "@/lib/three/environment-config";

type EnvironmentLightingProps = {
  scrollProgress: number;
};

export function EnvironmentLighting({ scrollProgress }: EnvironmentLightingProps) {
  const lighting = environmentConfig.lighting;
  const goldIntensity = lighting.gold.intensity * (0.86 + scrollProgress * 0.18);
  const rimIntensity = lighting.rim.intensity * (0.74 + scrollProgress * 0.26);
  const fieldIntensity = 0.78 + scrollProgress * 0.18;

  return (
    <>
      <ambientLight color={lighting.ambient.color} intensity={lighting.ambient.intensity} />
      <hemisphereLight
        color={lighting.hemisphere.color}
        groundColor={lighting.hemisphere.groundColor}
        intensity={lighting.hemisphere.intensity}
      />
      <directionalLight color={lighting.key.color} intensity={lighting.key.intensity} position={lighting.key.position} />
      <pointLight color={lighting.gold.color} distance={9.2} intensity={goldIntensity} position={lighting.gold.position} />
      <pointLight color={lighting.rim.color} distance={11} intensity={rimIntensity} position={lighting.rim.position} />
      {lighting.glowFields.map((field, index) => (
        <pointLight
          color={field.color}
          distance={8.4 + index * 1.8}
          intensity={field.intensity * fieldIntensity}
          key={`${field.color}-${field.position.join("-")}`}
          position={field.position}
        />
      ))}
    </>
  );
}
