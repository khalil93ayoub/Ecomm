"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { AdditiveBlending, BufferAttribute, MathUtils, Points } from "three";

import { environmentConfig, type EnvironmentQuality } from "@/lib/three/environment-config";

type EnvironmentParticlesProps = {
  quality: EnvironmentQuality;
  scrollProgress: number;
};

type EnvironmentParticle = {
  depth: number;
  drift: number;
  phase: number;
  scale: number;
  x: number;
  y: number;
  z: number;
};

function seededValue(index: number, offset: number) {
  const value = Math.sin(index * 127.1 + offset * 311.7) * 43758.5453;

  return value - Math.floor(value);
}

function createParticles(count: number): EnvironmentParticle[] {
  const field = environmentConfig.particles.field;

  return Array.from({ length: count }, (_item, index) => {
    const depth = seededValue(index, 5);

    return {
      depth,
      drift: seededValue(index, 9) * 0.5 + 0.35,
      phase: seededValue(index, 7) * Math.PI * 2,
      scale: seededValue(index, 11) * 0.7 + 0.55,
      x: (seededValue(index, 1) - 0.5) * field.x,
      y: (seededValue(index, 2) - 0.5) * field.y,
      z: -seededValue(index, 3) * field.z - 0.8,
    };
  });
}

export function EnvironmentParticles({ quality, scrollProgress }: EnvironmentParticlesProps) {
  const pointsRef = useRef<Points>(null);
  const particles = useMemo(() => createParticles(environmentConfig.particles.count[quality]), [quality]);
  const positions = useMemo(() => {
    const values = new Float32Array(particles.length * 3);

    particles.forEach((particle, index) => {
      const offset = index * 3;

      values[offset] = particle.x;
      values[offset + 1] = particle.y;
      values[offset + 2] = particle.z;
    });

    return values;
  }, [particles]);
  const particleRadius = environmentConfig.particles.radius[quality];
  const particleOpacity = environmentConfig.particles.opacity[quality];

  useFrame(({ clock }, delta) => {
    const points = pointsRef.current;

    if (!points) {
      return;
    }

    const positionAttribute = points.geometry.getAttribute("position") as BufferAttribute | undefined;

    if (!positionAttribute) {
      return;
    }

    const array = positionAttribute.array as Float32Array;
    const time = clock.getElapsedTime();
    const scrollDepth = MathUtils.smootherstep(scrollProgress, 0, 1) * 1.35;
    const charge = 0.5 + MathUtils.smootherstep(scrollProgress, 0.12, 0.52) * 0.5;
    const calm = 1 - MathUtils.smootherstep(scrollProgress, 0.72, 1) * 0.34;
    const ease = 1 - Math.exp(-3.2 * delta);

    particles.forEach((particle, index) => {
      const float = Math.sin(time * particle.drift + particle.phase) * 0.035;
      const depthMotion = scrollDepth * (0.45 + particle.depth);
      const offset = index * 3;

      array[offset] = MathUtils.lerp(
        array[offset] ?? particle.x,
        particle.x + Math.sin(time * 0.06 + particle.phase) * 0.06,
        ease,
      );
      array[offset + 1] = MathUtils.lerp(array[offset + 1] ?? particle.y, particle.y + float * charge, ease);
      array[offset + 2] = MathUtils.lerp(array[offset + 2] ?? particle.z, particle.z + depthMotion, ease);
    });

    positionAttribute.needsUpdate = true;
    points.rotation.y = MathUtils.lerp(points.rotation.y, scrollProgress * 0.06, ease);
    points.scale.setScalar(MathUtils.lerp(points.scale.x, calm, ease));
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        blending={AdditiveBlending}
        color="#fff4de"
        depthWrite={false}
        opacity={particleOpacity}
        size={particleRadius}
        sizeAttenuation
        transparent
      />
    </points>
  );
}
