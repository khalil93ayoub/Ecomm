"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { DoubleSide, Group, MathUtils } from "three";

import { environmentConfig, type EnvironmentGlassPanelConfig, type EnvironmentQuality } from "@/lib/three/environment-config";

type EnvironmentGlassPanelsProps = {
  pointer: {
    x: number;
    y: number;
  };
  pointerInfluence: number;
  quality: EnvironmentQuality;
  scrollProgress: number;
};

function resolvePanels(quality: EnvironmentQuality) {
  const panels = environmentConfig.glass.panels as readonly EnvironmentGlassPanelConfig[];

  if (quality === "low") {
    return panels.slice(0, environmentConfig.glass.mobileCount);
  }

  return panels;
}

export function EnvironmentGlassPanels({
  pointer,
  pointerInfluence,
  quality,
  scrollProgress,
}: EnvironmentGlassPanelsProps) {
  const groupRef = useRef<Group>(null);
  const panels = useMemo(() => resolvePanels(quality), [quality]);

  useFrame(({ clock }, delta) => {
    const group = groupRef.current;

    if (!group) {
      return;
    }

    const time = clock.getElapsedTime();
    const separation = MathUtils.smootherstep(scrollProgress, 0.12, 0.58);
    const settle = MathUtils.smootherstep(scrollProgress, 0.7, 1);
    const ease = 1 - Math.exp(-3.8 * delta);

    group.children.forEach((child, index) => {
      const panel = panels[index];

      if (!panel) {
        return;
      }

      const depth = separation * (1 - settle * 0.28);
      const float = Math.sin(time * panel.speed + index * 1.7) * 0.025;

      child.position.x = MathUtils.lerp(
        child.position.x,
        panel.position[0] + panel.depthDrift[0] * depth + pointer.x * 0.08 * pointerInfluence,
        ease,
      );
      child.position.y = MathUtils.lerp(
        child.position.y,
        panel.position[1] + panel.depthDrift[1] * depth + float + pointer.y * 0.035 * pointerInfluence,
        ease,
      );
      child.position.z = MathUtils.lerp(child.position.z, panel.position[2] + panel.depthDrift[2] * depth, ease);
      child.rotation.x = MathUtils.lerp(child.rotation.x, panel.rotation[0] + float * 0.7, ease);
      child.rotation.y = MathUtils.lerp(child.rotation.y, panel.rotation[1] + separation * 0.12, ease);
      child.rotation.z = MathUtils.lerp(child.rotation.z, panel.rotation[2] - separation * 0.08, ease);
    });
  });

  const panelVisibility = 0.42 + MathUtils.smootherstep(scrollProgress, 0.34, 0.66) * 0.58;

  return (
    <group ref={groupRef}>
      {panels.map((panel, index) => (
        <mesh
          key={`${panel.position.join("-")}-${index}`}
          position={panel.position}
          rotation={panel.rotation}
          scale={[panel.scale[0], panel.scale[2], 1]}
        >
          <planeGeometry args={[1, 1, 1, 1]} />
          <meshPhysicalMaterial
            clearcoat={0.45}
            color="#dfe7e9"
            metalness={0.08}
            opacity={panel.opacity * panelVisibility}
            roughness={0.06}
            side={DoubleSide}
            transparent
            transmission={0.46}
          />
        </mesh>
      ))}
    </group>
  );
}
