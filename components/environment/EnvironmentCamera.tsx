"use client";

import { useFrame } from "@react-three/fiber";
import { MathUtils, Vector3 } from "three";

import { environmentConfig, type EnvironmentCameraStage } from "@/lib/three/environment-config";

type EnvironmentCameraProps = {
  pointer: {
    x: number;
    y: number;
  };
  pointerInfluence: number;
  scrollProgress: number;
};

function resolveCameraStage(progress: number) {
  const stages = environmentConfig.camera.stages as readonly EnvironmentCameraStage[];
  const nextStageIndex = stages.findIndex((stage) => progress <= stage.at);

  if (nextStageIndex <= 0) {
    const firstStage = stages[0]!;

    return {
      from: firstStage,
      localProgress: 0,
      to: firstStage,
    };
  }

  if (nextStageIndex === -1) {
    const finalStage = stages[stages.length - 1]!;

    return {
      from: finalStage,
      localProgress: 1,
      to: finalStage,
    };
  }

  const from = stages[nextStageIndex - 1]!;
  const to = stages[nextStageIndex]!;
  const range = to.at - from.at;

  return {
    from,
    localProgress: range > 0 ? MathUtils.clamp((progress - from.at) / range, 0, 1) : 1,
    to,
  };
}

export function EnvironmentCamera({
  pointer,
  pointerInfluence,
  scrollProgress,
}: EnvironmentCameraProps) {
  useFrame(({ camera }, delta) => {
    const { from, localProgress, to } = resolveCameraStage(scrollProgress);
    const stageEase = MathUtils.smootherstep(localProgress, 0, 1);
    const ease = 1 - Math.exp(-4.2 * delta);
    const targetPosition = new Vector3(...from.position).lerp(new Vector3(...to.position), stageEase);
    const targetLookAt = new Vector3(...from.lookAt).lerp(new Vector3(...to.lookAt), stageEase);

    targetPosition.x += pointer.x * environmentConfig.camera.pointerOffset.x * pointerInfluence;
    targetPosition.y += pointer.y * environmentConfig.camera.pointerOffset.y * pointerInfluence;

    camera.position.x = MathUtils.lerp(camera.position.x, targetPosition.x, ease);
    camera.position.y = MathUtils.lerp(camera.position.y, targetPosition.y, ease);
    camera.position.z = MathUtils.lerp(camera.position.z, targetPosition.z, ease);
    camera.lookAt(targetLookAt);
  });

  return null;
}
