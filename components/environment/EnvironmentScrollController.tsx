"use client";

import { useFrame } from "@react-three/fiber";
import { useRef, type ReactNode } from "react";
import { Group, MathUtils } from "three";

import { environmentConfig } from "@/lib/three/environment-config";

type EnvironmentScrollControllerProps = {
  children: ReactNode;
  pointer: {
    x: number;
    y: number;
  };
  pointerInfluence: number;
  scrollProgress: number;
};

export function EnvironmentScrollController({
  children,
  pointer,
  pointerInfluence,
  scrollProgress,
}: EnvironmentScrollControllerProps) {
  const groupRef = useRef<Group>(null);

  useFrame(({ clock }, delta) => {
    const group = groupRef.current;

    if (!group) {
      return;
    }

    const time = clock.getElapsedTime();
    const easedProgress = MathUtils.smootherstep(scrollProgress, 0, 1);
    const openSpace = MathUtils.smootherstep(scrollProgress, 0.16, 0.58);
    const settle = MathUtils.smootherstep(scrollProgress, 0.78, 1);
    const ease = 1 - Math.exp(-4.1 * delta);
    const environment = environmentConfig.environment;

    group.position.x = MathUtils.lerp(
      group.position.x,
      environment.scrollShift * (easedProgress - 0.45) + pointer.x * 0.08 * pointerInfluence,
      ease,
    );
    group.position.y = MathUtils.lerp(
      group.position.y,
      environment.scrollLift * Math.sin(easedProgress * Math.PI) + pointer.y * 0.04 * pointerInfluence,
      ease,
    );
    group.position.z = MathUtils.lerp(group.position.z, environment.scrollDepth * openSpace, ease);
    group.rotation.x = MathUtils.lerp(group.rotation.x, pointer.y * 0.018 * pointerInfluence, ease);
    group.rotation.y = MathUtils.lerp(
      group.rotation.y,
      time * 0.018 + easedProgress * environmentConfig.motion.scrollSpeed * (1 - settle * 0.45),
      ease,
    );
    group.rotation.z = MathUtils.lerp(group.rotation.z, Math.sin(easedProgress * Math.PI) * 0.08, ease);
  });

  return <group ref={groupRef}>{children}</group>;
}
