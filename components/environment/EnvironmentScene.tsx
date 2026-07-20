"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { ACESFilmicToneMapping, SRGBColorSpace } from "three";

import { EnvironmentCamera } from "@/components/environment/EnvironmentCamera";
import { EnvironmentCursorLight } from "@/components/environment/EnvironmentCursorLight";
import { EnvironmentFog } from "@/components/environment/EnvironmentFog";
import { EnvironmentGlassPanels } from "@/components/environment/EnvironmentGlassPanels";
import { EnvironmentLighting } from "@/components/environment/EnvironmentLighting";
import { EnvironmentParticles } from "@/components/environment/EnvironmentParticles";
import { EnvironmentScrollController } from "@/components/environment/EnvironmentScrollController";
import { environmentConfig, type EnvironmentQuality } from "@/lib/three/environment-config";

type EnvironmentSceneProps = {
  isVisible: boolean;
  onCanvasMounted: () => void;
  onReady: () => void;
  pointer: {
    x: number;
    y: number;
  };
  pointerInfluence: number;
  quality: EnvironmentQuality;
  scrollProgress: number;
};

export function EnvironmentScene({
  isVisible,
  onCanvasMounted,
  onReady,
  pointer,
  pointerInfluence,
  quality,
  scrollProgress,
}: EnvironmentSceneProps) {
  const initialCameraStage = environmentConfig.camera.stages[0]!;

  return (
    <Canvas
      aria-hidden="true"
      camera={{
        far: environmentConfig.camera.far,
        fov: environmentConfig.camera.fov,
        near: environmentConfig.camera.near,
        position: initialCameraStage.position,
      }}
      dpr={environmentConfig.renderer.dpr[quality]}
      frameloop={isVisible ? "always" : "demand"}
      gl={{
        alpha: true,
        antialias: quality === "standard",
        powerPreference: "high-performance",
      }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        gl.outputColorSpace = SRGBColorSpace;
        gl.toneMapping = ACESFilmicToneMapping;
        onCanvasMounted();
        window.requestAnimationFrame(onReady);
      }}
    >
      <Suspense fallback={null}>
        <EnvironmentFog quality={quality} scrollProgress={scrollProgress} />
        <EnvironmentLighting scrollProgress={scrollProgress} />
        <EnvironmentCursorLight pointer={pointer} pointerInfluence={pointerInfluence} />
        <EnvironmentCamera
          pointer={pointer}
          pointerInfluence={pointerInfluence}
          scrollProgress={scrollProgress}
        />
        <EnvironmentScrollController
          pointer={pointer}
          pointerInfluence={pointerInfluence}
          scrollProgress={scrollProgress}
        >
          <EnvironmentParticles quality={quality} scrollProgress={scrollProgress} />
          <EnvironmentGlassPanels
            pointer={pointer}
            pointerInfluence={pointerInfluence}
            quality={quality}
            scrollProgress={scrollProgress}
          />
        </EnvironmentScrollController>
      </Suspense>
    </Canvas>
  );
}
