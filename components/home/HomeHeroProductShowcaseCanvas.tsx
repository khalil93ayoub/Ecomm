"use client";

import { Line } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import {
  ACESFilmicToneMapping,
  AdditiveBlending,
  CanvasTexture,
  DoubleSide,
  ExtrudeGeometry,
  Group,
  MathUtils,
  Mesh,
  MeshPhysicalMaterial,
  Points,
  PointLight,
  Shape,
  SpriteMaterial,
  SRGBColorSpace,
  Texture,
  TextureLoader,
  Vector3,
} from "three";

import type { HeroShowcaseProduct, HeroShowcaseQuality } from "@/components/home/HomeHeroProductShowcase";

type HomeHeroProductShowcaseCanvasProps = {
  onReady: () => void;
  products: HeroShowcaseProduct[];
  quality: HeroShowcaseQuality;
};

type MasterOrbitConfig = {
  center: [number, number, number];
  radiusX: number;
  radiusZ: number;
  scaleDepth: number;
  scrollDepth: number;
  scrollX: number;
  speed: number;
  verticalDrift: number;
};

type MasterOrbitState = {
  angle: number;
  flow: number;
  time: number;
};

type PanelSlotConfig = {
  roll: number;
  scale: number;
  slotAngle: number;
  verticalOffset: number;
};

type TextureImageLike = {
  height?: unknown;
  width?: unknown;
} | null;

const productImageVertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const productImageFragmentShader = `
  uniform sampler2D map;
  varying vec2 vUv;

  void main() {
    vec4 texel = texture2D(map, vUv);
    float maxChannel = max(texel.r, max(texel.g, texel.b));
    float minChannel = min(texel.r, min(texel.g, texel.b));
    float saturation = maxChannel - minChannel;
    float brightBackground = smoothstep(0.72, 0.98, maxChannel) * (1.0 - smoothstep(0.08, 0.26, saturation));
    float horizontalFeather = smoothstep(0.0, 0.045, vUv.x) * (1.0 - smoothstep(0.955, 1.0, vUv.x));
    float verticalFeather = smoothstep(0.0, 0.045, vUv.y) * (1.0 - smoothstep(0.955, 1.0, vUv.y));
    float alpha = texel.a * horizontalFeather * verticalFeather * mix(1.0, 0.2, brightBackground);
    vec3 color = mix(texel.rgb, texel.rgb * 0.62, brightBackground * 0.72);

    gl_FragColor = vec4(color, alpha);
  }
`;

const quarterTurn = Math.PI * 0.5;

const desktopMasterOrbitConfig: MasterOrbitConfig = {
  center: [0.1, -0.02, -0.62],
  radiusX: 1.78,
  radiusZ: 1.08,
  scaleDepth: 0.08,
  scrollDepth: 0.22,
  scrollX: 0.12,
  speed: 0.115,
  verticalDrift: 0.06,
};

const mobileMasterOrbitConfig: MasterOrbitConfig = {
  center: [0.32, -1.94, -0.74],
  radiusX: 0.86,
  radiusZ: 0.48,
  scaleDepth: 0.06,
  scrollDepth: 0.12,
  scrollX: 0.04,
  speed: 0.1,
  verticalDrift: 0.04,
};

const desktopPanelSlots: PanelSlotConfig[] = [
  {
    roll: -0.035,
    scale: 0.74,
    slotAngle: 0,
    verticalOffset: -0.06,
  },
  {
    roll: 0.025,
    scale: 0.94,
    slotAngle: quarterTurn,
    verticalOffset: 0.1,
  },
  {
    roll: -0.02,
    scale: 0.9,
    slotAngle: quarterTurn * 2,
    verticalOffset: 0.02,
  },
  {
    roll: 0.04,
    scale: 0.72,
    slotAngle: quarterTurn * 3,
    verticalOffset: -0.08,
  },
];

const mobilePanelSlots: PanelSlotConfig[] = [
  {
    roll: -0.032,
    scale: 0.44,
    slotAngle: 0,
    verticalOffset: -0.08,
  },
  {
    roll: 0.018,
    scale: 0.54,
    slotAngle: quarterTurn,
    verticalOffset: 0.03,
  },
  {
    roll: -0.016,
    scale: 0.5,
    slotAngle: quarterTurn * 2,
    verticalOffset: -0.02,
  },
  {
    roll: 0.036,
    scale: 0.42,
    slotAngle: quarterTurn * 3,
    verticalOffset: -0.11,
  },
];

function createGlassSlabGeometry(width: number, height: number, depth: number) {
  const radius = 0.075;
  const x = -width / 2;
  const y = -height / 2;
  const shape = new Shape();

  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + radius);
  shape.lineTo(x + width, y + height - radius);
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  shape.lineTo(x + radius, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);

  const geometry = new ExtrudeGeometry(shape, {
    bevelEnabled: true,
    bevelSegments: 4,
    bevelSize: 0.018,
    bevelThickness: 0.018,
    depth,
    steps: 1,
  });

  geometry.center();

  return geometry;
}

function createGlowTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;

  const context = canvas.getContext("2d");

  if (!context) {
    return new CanvasTexture(canvas);
  }

  const gradient = context.createRadialGradient(128, 128, 0, 128, 128, 128);
  gradient.addColorStop(0, "rgba(255, 246, 224, 0.95)");
  gradient.addColorStop(0.24, "rgba(212, 168, 92, 0.42)");
  gradient.addColorStop(0.62, "rgba(212, 168, 92, 0.12)");
  gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, 256, 256);

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;

  return texture;
}

function useProductTexture(src: string) {
  const [texture, setTexture] = useState<Texture | null>(null);

  useEffect(() => {
    let isActive = true;
    let loadedTexture: Texture | null = null;
    const loader = new TextureLoader();

    loader.load(
      src,
      (nextTexture) => {
        nextTexture.colorSpace = SRGBColorSpace;
        nextTexture.anisotropy = 8;
        nextTexture.needsUpdate = true;
        loadedTexture = nextTexture;

        if (isActive) {
          setTexture(nextTexture);
        } else {
          nextTexture.dispose();
        }
      },
      undefined,
      () => {
        if (isActive) {
          setTexture(null);
        }
      },
    );

    return () => {
      isActive = false;
      loadedTexture?.dispose();
    };
  }, [src]);

  return texture;
}

function useHeroScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let frameId = 0;

    function updateScrollProgress() {
      const progress = MathUtils.clamp(window.scrollY / Math.max(window.innerHeight, 1), 0, 1);

      setScrollProgress(progress);
    }

    function handleScroll() {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateScrollProgress);
    }

    updateScrollProgress();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scrollProgress;
}

function ParticleLayer({
  color,
  count,
  depth,
  opacity,
  phase,
  scrollProgress,
  size,
  speed,
  spread,
}: {
  color: string;
  count: number;
  depth: number;
  opacity: number;
  phase: number;
  scrollProgress: number;
  size: number;
  speed: number;
  spread: [number, number, number];
}) {
  const pointsRef = useRef<Points>(null);
  const particles = useMemo(() => {
    const values = new Float32Array(count * 3);

    for (let index = 0; index < count; index += 1) {
      const offset = index * 3;
      const seed = Math.sin((index + phase) * 87.13) * 43758.5453;
      const seedB = Math.sin((index + phase) * 217.9) * 17831.739;
      const seedC = Math.sin((index + phase) * 13.7) * 9917.31;

      values[offset] = ((seed - Math.floor(seed)) - 0.5) * spread[0];
      values[offset + 1] = ((seedB - Math.floor(seedB)) - 0.5) * spread[1];
      values[offset + 2] = depth - (seedC - Math.floor(seedC)) * spread[2];
    }

    return values;
  }, [count, depth, phase, spread]);

  useFrame(({ clock }) => {
    const points = pointsRef.current;

    if (!points) {
      return;
    }

    const time = clock.getElapsedTime();

    points.position.x = Math.sin(time * speed + phase) * 0.16 + scrollProgress * 0.18;
    points.position.y = Math.cos(time * speed * 0.7 + phase) * 0.08;
    points.position.z = Math.sin(time * speed * 0.55 + phase) * 0.18 - scrollProgress * 0.28;
    points.rotation.y = scrollProgress * 0.1 + Math.sin(time * speed * 0.22 + phase) * 0.045;
    points.rotation.z = Math.sin(time * speed * 0.18 + phase) * 0.028;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[particles, 3]} />
      </bufferGeometry>
      <pointsMaterial
        blending={AdditiveBlending}
        color={color}
        depthWrite={false}
        opacity={opacity}
        size={size}
        sizeAttenuation
        transparent
      />
    </points>
  );
}

function EnergyParticles({
  quality,
  scrollProgress,
}: {
  quality: HeroShowcaseQuality;
  scrollProgress: number;
}) {
  const mobile = quality === "mobile";

  return (
    <group>
      <ParticleLayer
        color="#fff5df"
        count={mobile ? 42 : 72}
        depth={0.32}
        opacity={0.42}
        phase={0.2}
        scrollProgress={scrollProgress}
        size={mobile ? 0.014 : 0.016}
        speed={0.11}
        spread={mobile ? [2.8, 1.45, 2.2] : [4.6, 2.0, 2.6]}
      />
      <ParticleLayer
        color="#d7a45a"
        count={mobile ? 54 : 86}
        depth={-1.1}
        opacity={0.5}
        phase={1.6}
        scrollProgress={scrollProgress}
        size={mobile ? 0.018 : 0.02}
        speed={0.075}
        spread={mobile ? [3.0, 1.7, 2.8] : [5.2, 2.6, 3.8]}
      />
      <ParticleLayer
        color="#9ca7aa"
        count={mobile ? 34 : 58}
        depth={-3.2}
        opacity={0.28}
        phase={3.2}
        scrollProgress={scrollProgress}
        size={mobile ? 0.012 : 0.014}
        speed={0.052}
        spread={mobile ? [3.4, 1.8, 3.4] : [6.2, 3.0, 5.0]}
      />
    </group>
  );
}

function EnergyFocalPoint({ scrollProgress }: { scrollProgress: number }) {
  const spriteRef = useRef<SpriteMaterial>(null);
  const texture = useMemo(() => createGlowTexture(), []);

  useFrame(({ clock }) => {
    const material = spriteRef.current;

    if (!material) {
      return;
    }

    const pulse = 0.86 + Math.sin(clock.getElapsedTime() * 0.62) * 0.14;
    const focus = 0.82 + MathUtils.smootherstep(scrollProgress, 0.28, 0.62) * 0.55;
    const calm = 1 - MathUtils.smootherstep(scrollProgress, 0.78, 1) * 0.34;

    material.opacity = pulse * focus * calm;
  });

  return (
    <sprite position={[0.25, -0.06, -1.05]} scale={[2.7, 2.7, 1]}>
      <spriteMaterial
        blending={AdditiveBlending}
        depthWrite={false}
        map={texture}
        opacity={0.9}
        ref={spriteRef}
        toneMapped={false}
        transparent
      />
    </sprite>
  );
}

function AnimatedShowcaseLights({
  quality,
  scrollProgress,
}: {
  quality: HeroShowcaseQuality;
  scrollProgress: number;
}) {
  const goldLightRef = useRef<PointLight>(null);
  const whiteLightRef = useRef<PointLight>(null);
  const isMobileQuality = quality === "mobile";

  useFrame(({ clock }, delta) => {
    const goldLight = goldLightRef.current;
    const whiteLight = whiteLightRef.current;

    if (!goldLight || !whiteLight) {
      return;
    }

    const time = clock.getElapsedTime();
    const flow = MathUtils.smootherstep(scrollProgress, 0.08, 0.72);
    const settle = 1 - MathUtils.smootherstep(scrollProgress, 0.78, 1) * 0.22;
    const ease = 1 - Math.exp(-2.4 * delta);
    const goldBase = isMobileQuality ? 4.9 : 6.2;
    const whiteBase = isMobileQuality ? 2.5 : 3.4;

    goldLight.position.x = MathUtils.lerp(goldLight.position.x, 0.46 + Math.sin(time * 0.16) * 0.45 + flow * 0.28, ease);
    goldLight.position.y = MathUtils.lerp(goldLight.position.y, 0.02 + Math.cos(time * 0.11) * 0.18, ease);
    goldLight.position.z = MathUtils.lerp(goldLight.position.z, 1.45 + Math.sin(time * 0.09) * 0.24 - flow * 0.35, ease);
    goldLight.intensity = MathUtils.lerp(
      goldLight.intensity,
      goldBase * settle * (1 + Math.sin(time * 0.22) * 0.1 + flow * 0.08),
      ease,
    );

    whiteLight.position.x = MathUtils.lerp(whiteLight.position.x, -2.34 + Math.cos(time * 0.12) * 0.34 - flow * 0.18, ease);
    whiteLight.position.y = MathUtils.lerp(whiteLight.position.y, 1.28 + Math.sin(time * 0.1) * 0.22, ease);
    whiteLight.position.z = MathUtils.lerp(whiteLight.position.z, 2.24 + Math.cos(time * 0.08) * 0.28, ease);
    whiteLight.intensity = MathUtils.lerp(
      whiteLight.intensity,
      whiteBase * settle * (1 + Math.cos(time * 0.18) * 0.08),
      ease,
    );
  });

  return (
    <>
      <pointLight color="#d7a55a" distance={7.2} intensity={isMobileQuality ? 4.8 : 6.2} position={[0.5, 0.0, 1.6]} ref={goldLightRef} />
      <pointLight color="#fff4df" distance={8.4} intensity={isMobileQuality ? 2.4 : 3.4} position={[-2.4, 1.35, 2.4]} ref={whiteLightRef} />
    </>
  );
}

function CentralNovaraLogo({
  orbitConfig,
  orbitStateRef,
  quality,
}: {
  orbitConfig: MasterOrbitConfig;
  orbitStateRef: MutableRefObject<MasterOrbitState>;
  quality: HeroShowcaseQuality;
}) {
  const groupRef = useRef<Group>(null);
  const glowMaterialRef = useRef<SpriteMaterial>(null);
  const glassMaterialRef = useRef<MeshPhysicalMaterial>(null);
  const logoTexture = useProductTexture("/images/brand/logo-desktop.jpg");
  const glowTexture = useMemo(() => createGlowTexture(), []);
  const isMobileQuality = quality === "mobile";
  const logoGeometry = useMemo(
    () => createGlassSlabGeometry(isMobileQuality ? 0.86 : 1.12, isMobileQuality ? 0.34 : 0.42, 0.046),
    [isMobileQuality],
  );
  const logoEdgePoints = useMemo(() => {
    const halfWidth = isMobileQuality ? 0.43 : 0.56;
    const halfHeight = isMobileQuality ? 0.17 : 0.21;

    return [
      new Vector3(-halfWidth, -halfHeight, 0.034),
      new Vector3(halfWidth, -halfHeight, 0.034),
      new Vector3(halfWidth, halfHeight, 0.034),
      new Vector3(-halfWidth, halfHeight, 0.034),
      new Vector3(-halfWidth, -halfHeight, 0.034),
    ];
  }, [isMobileQuality]);

  useFrame((_state, delta) => {
    const group = groupRef.current;
    const glowMaterial = glowMaterialRef.current;
    const glassMaterial = glassMaterialRef.current;

    if (!group) {
      return;
    }

    const { flow, time } = orbitStateRef.current;
    const ease = 1 - Math.exp(-2.8 * delta);

    group.position.x = MathUtils.lerp(group.position.x, orbitConfig.center[0] + flow * orbitConfig.scrollX, ease);
    group.position.y = MathUtils.lerp(group.position.y, orbitConfig.center[1] + (isMobileQuality ? 0.02 : 0.04), ease);
    group.position.z = MathUtils.lerp(group.position.z, orbitConfig.center[2] - flow * orbitConfig.scrollDepth + (isMobileQuality ? 0.2 : 0.08), ease);
    group.rotation.x = 0;
    group.rotation.y = time * 0.14;
    group.rotation.z = 0;

    if (glowMaterial) {
      glowMaterial.opacity = 0.54 + Math.sin(time * 0.32) * 0.08;
    }

    if (glassMaterial) {
      glassMaterial.roughness = MathUtils.lerp(glassMaterial.roughness, 0.075 + Math.sin(time * 0.18) * 0.018, ease);
    }
  });

  const textureImage = logoTexture?.image as TextureImageLike;
  const textureWidth = typeof textureImage?.width === "number" ? textureImage.width : 1;
  const textureHeight = typeof textureImage?.height === "number" ? textureImage.height : 1;
  const aspect = textureWidth > 0 && textureHeight > 0 ? textureWidth / Math.max(textureHeight, 1) : 1;
  const logoHeight = isMobileQuality ? 0.18 : 0.24;
  const logoWidth = MathUtils.clamp(logoHeight * aspect, isMobileQuality ? 0.52 : 0.72, isMobileQuality ? 0.8 : 0.98);

  return (
    <group ref={groupRef} scale={isMobileQuality ? 0.9 : 0.82}>
      <sprite position={[0, 0, -0.08]} scale={isMobileQuality ? [1.8, 1.8, 1] : [2.05, 2.05, 1]}>
        <spriteMaterial
          blending={AdditiveBlending}
          depthWrite={false}
          map={glowTexture}
          opacity={0.55}
          ref={glowMaterialRef}
          toneMapped={false}
          transparent
        />
      </sprite>
      <mesh geometry={logoGeometry}>
        <meshPhysicalMaterial
          clearcoat={0.6}
          color="#f8f1e7"
          depthWrite={false}
          ior={1.38}
          metalness={0.04}
          opacity={0.2}
          ref={glassMaterialRef}
          roughness={0.08}
          side={DoubleSide}
          thickness={0.12}
          transmission={0.58}
          transparent
        />
      </mesh>
      <Line color="#fff7ec" depthWrite={false} lineWidth={0.95} opacity={0.48} points={logoEdgePoints} toneMapped={false} transparent />
      <mesh position={[0, 0, 0.055]} renderOrder={3}>
        <planeGeometry args={[logoWidth, logoHeight]} />
        {logoTexture ? (
          <shaderMaterial
            depthWrite={false}
            fragmentShader={productImageFragmentShader}
            toneMapped={false}
            transparent
            uniforms={{
              map: {
                value: logoTexture,
              },
            }}
            vertexShader={productImageVertexShader}
          />
        ) : (
          <meshBasicMaterial color="#d4a75f" depthWrite={false} opacity={0.28} transparent />
        )}
      </mesh>
    </group>
  );
}

function ProductGlassPanel({
  config,
  index,
  orbitConfig,
  orbitStateRef,
  product,
}: {
  config: PanelSlotConfig;
  index: number;
  orbitConfig: MasterOrbitConfig;
  orbitStateRef: MutableRefObject<MasterOrbitState>;
  product: HeroShowcaseProduct;
}) {
  const groupRef = useRef<Group>(null);
  const glassMaterialRef = useRef<MeshPhysicalMaterial>(null);
  const productMeshRef = useRef<Mesh>(null);
  const [isHovered, setIsHovered] = useState(false);
  const texture = useProductTexture(product.image.src);
  const geometry = useMemo(() => createGlassSlabGeometry(1.08, 1.62, 0.052), []);
  const edgePoints = useMemo(
    () => [
      new Vector3(-0.54, -0.81, 0.036),
      new Vector3(0.54, -0.81, 0.036),
      new Vector3(0.54, 0.81, 0.036),
      new Vector3(-0.54, 0.81, 0.036),
      new Vector3(-0.54, -0.81, 0.036),
    ],
    [],
  );

  useFrame((_state, delta) => {
    const group = groupRef.current;
    const productMesh = productMeshRef.current;
    const glassMaterial = glassMaterialRef.current;

    if (!group) {
      return;
    }

    const { angle, flow, time } = orbitStateRef.current;
    const slotAngle = angle + config.slotAngle;
    const orbitX = Math.cos(slotAngle) * orbitConfig.radiusX;
    const orbitZ = Math.sin(slotAngle) * orbitConfig.radiusZ;
    const depthLift = orbitConfig.radiusZ === 0 ? 0 : MathUtils.clamp(orbitZ / orbitConfig.radiusZ, -1, 1);
    const sideProfile = orbitConfig.radiusX === 0 ? 0 : MathUtils.clamp(orbitX / orbitConfig.radiusX, -1, 1);
    const calm = MathUtils.smootherstep(flow, 0.76, 1);
    const hoverLift = isHovered ? 0.08 : 0;
    const ease = 1 - Math.exp(-3.4 * delta);
    const independentFloat = Math.sin(time * 0.34 + config.slotAngle) * orbitConfig.verticalDrift;
    const orbitalYaw = MathUtils.clamp(
      -sideProfile * 0.82 + depthLift * 0.14 + (isHovered ? 0.035 : 0),
      -1.02,
      1.02,
    );
    const targetScale = config.scale * (1 + depthLift * orbitConfig.scaleDepth + (isHovered ? 0.018 : 0));

    group.position.x = MathUtils.lerp(group.position.x, orbitConfig.center[0] + orbitX + flow * orbitConfig.scrollX, ease);
    group.position.y = MathUtils.lerp(group.position.y, orbitConfig.center[1] + config.verticalOffset + independentFloat + hoverLift, ease);
    group.position.z = MathUtils.lerp(group.position.z, orbitConfig.center[2] + orbitZ - flow * orbitConfig.scrollDepth, ease);
    group.rotation.x = MathUtils.lerp(group.rotation.x, 0.025 + independentFloat * 0.08, ease);
    group.rotation.y = MathUtils.lerp(group.rotation.y, orbitalYaw, ease);
    group.rotation.z = MathUtils.lerp(group.rotation.z, config.roll + Math.sin(slotAngle) * 0.018, ease);
    group.scale.setScalar(MathUtils.lerp(group.scale.x, targetScale, ease));

    if (productMesh) {
      const motionMultiplier = 1 - calm * 0.45;

      productMesh.rotation.x = MathUtils.lerp(
        productMesh.rotation.x,
        Math.sin(time * 0.16 + index * 0.9) * 0.018 * motionMultiplier,
        ease,
      );
      productMesh.rotation.y = MathUtils.lerp(
        productMesh.rotation.y,
        Math.sin(time * 0.19 + index) * 0.036 * motionMultiplier,
        ease,
      );
      productMesh.rotation.z = MathUtils.lerp(
        productMesh.rotation.z,
        Math.sin(time * 0.13 + index * 1.3) * 0.014 * motionMultiplier,
        ease,
      );
      productMesh.position.y = MathUtils.lerp(productMesh.position.y, Math.sin(time * 0.28 + index) * 0.025, ease);
      productMesh.scale.setScalar(MathUtils.lerp(productMesh.scale.x, isHovered ? 1.035 : 1, ease));
    }

    if (glassMaterial) {
      glassMaterial.opacity = MathUtils.lerp(glassMaterial.opacity, isHovered ? 0.32 : 0.24, ease);
      glassMaterial.roughness = MathUtils.lerp(glassMaterial.roughness, isHovered ? 0.02 : 0.06, ease);
    }
  });

  const textureImage = texture?.image as TextureImageLike;
  const textureWidth = typeof textureImage?.width === "number" ? textureImage.width : 1;
  const textureHeight = typeof textureImage?.height === "number" ? textureImage.height : 1;
  const aspect =
    textureWidth > 0 && textureHeight > 0 ? textureWidth / Math.max(textureHeight, 1) : 1;
  const imageHeight = 0.94;
  const imageWidth = MathUtils.clamp(imageHeight * aspect, 0.68, 0.92);

  return (
    <group
      onPointerOut={() => setIsHovered(false)}
      onPointerOver={() => setIsHovered(true)}
      position={orbitConfig.center}
      ref={groupRef}
      scale={config.scale}
    >
      <mesh geometry={geometry}>
        <meshPhysicalMaterial
          clearcoat={0.72}
          color="#eef5f4"
          depthWrite={false}
          ior={1.42}
          metalness={0.05}
          opacity={0.24}
          ref={glassMaterialRef}
          roughness={0.06}
          side={DoubleSide}
          thickness={0.18}
          transmission={0.72}
          transparent
        />
      </mesh>
      <Line color="#fff7ec" depthWrite={false} lineWidth={1.2} opacity={0.64} points={edgePoints} toneMapped={false} transparent />
      <Line
          color="#d5a45a"
        depthWrite={false}
        lineWidth={0.85}
          opacity={0.32}
          points={[
          new Vector3(-0.48, -0.7, 0.05),
          new Vector3(0.48, -0.7, 0.05),
        ]}
        toneMapped={false}
        transparent
      />
      <mesh position={[0, 0.02, 0.075]} ref={productMeshRef} renderOrder={2}>
        <planeGeometry args={[imageWidth, imageHeight]} />
        {texture ? (
          <shaderMaterial
            depthWrite={false}
            fragmentShader={productImageFragmentShader}
            toneMapped={false}
            transparent
            uniforms={{
              map: {
                value: texture,
              },
            }}
            vertexShader={productImageVertexShader}
          />
        ) : (
          <meshBasicMaterial color="#d7c7aa" depthWrite={false} opacity={0.18} transparent />
        )}
      </mesh>
      <mesh position={[0.08, 0.34, 0.085]} rotation={[0, 0, -0.28]} scale={[0.72, 0.05, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          blending={AdditiveBlending}
          color="#fff8ee"
          depthWrite={false}
          opacity={isHovered ? 0.32 : 0.18}
          toneMapped={false}
          transparent
        />
      </mesh>
    </group>
  );
}

function ProductShowcaseScene({
  onReady,
  products,
  quality,
}: HomeHeroProductShowcaseCanvasProps) {
  const rootRef = useRef<Group>(null);
  const scrollProgress = useHeroScrollProgress();
  const isMobileQuality = quality === "mobile";
  const activeOrbitConfig = isMobileQuality ? mobileMasterOrbitConfig : desktopMasterOrbitConfig;
  const activePanelSlots = isMobileQuality ? mobilePanelSlots : desktopPanelSlots;
  const orbitStateRef = useRef<MasterOrbitState>({
    angle: 0,
    flow: 0,
    time: 0,
  });

  useEffect(() => {
    const frameId = window.requestAnimationFrame(onReady);

    return () => window.cancelAnimationFrame(frameId);
  }, [onReady]);

  useFrame(({ camera, clock }, delta) => {
    const root = rootRef.current;
    const time = clock.getElapsedTime();
    const flow = MathUtils.smootherstep(scrollProgress, 0.04, 0.8);
    const ease = 1 - Math.exp(-2.6 * delta);
    const cameraTargetX = isMobileQuality ? 0.34 : 0.12;
    const cameraTargetY = isMobileQuality ? -0.78 : 0.02;
    const cameraTargetZ = isMobileQuality ? -0.8 : -0.6;

    orbitStateRef.current.angle = time * activeOrbitConfig.speed;
    orbitStateRef.current.flow = flow;
    orbitStateRef.current.time = time;

    camera.position.x = MathUtils.lerp(
      camera.position.x,
      (isMobileQuality ? 0.28 : 0.08) + Math.sin(time * 0.09) * (isMobileQuality ? 0.02 : 0.04) + flow * (isMobileQuality ? 0.06 : 0.16),
      ease,
    );
    camera.position.y = MathUtils.lerp(
      camera.position.y,
      (isMobileQuality ? -0.16 : 0.16) + Math.sin(time * 0.07) * (isMobileQuality ? 0.012 : 0.025),
      ease,
    );
    camera.position.z = MathUtils.lerp(camera.position.z, (isMobileQuality ? 7.55 : 6.45) - flow * (isMobileQuality ? 0.18 : 0.42), ease);
    camera.lookAt(cameraTargetX, cameraTargetY, cameraTargetZ);

    if (root) {
      root.rotation.y = MathUtils.lerp(root.rotation.y, (isMobileQuality ? -0.04 : -0.1) + flow * (isMobileQuality ? 0.06 : 0.12), ease);
      root.position.x = MathUtils.lerp(root.position.x, (isMobileQuality ? 0.22 : 0.2) - flow * (isMobileQuality ? 0.02 : 0.08), ease);
      root.position.y = MathUtils.lerp(root.position.y, isMobileQuality ? -0.45 : 0, ease);
      root.position.z = MathUtils.lerp(root.position.z, (isMobileQuality ? -0.04 : -0.1) - flow * (isMobileQuality ? 0.12 : 0.2), ease);
    }
  });

  return (
    <>
      <fog attach="fog" args={["#030405", isMobileQuality ? 4.2 : 4.8, isMobileQuality ? 11.4 : 13.2]} />
      <ambientLight color="#fff1dc" intensity={isMobileQuality ? 0.32 : 0.36} />
      <hemisphereLight color="#fff4e5" groundColor="#020203" intensity={isMobileQuality ? 0.34 : 0.42} />
      <directionalLight color="#fff8ee" intensity={isMobileQuality ? 3.2 : 4.2} position={[2.8, 3.1, 4.4]} />
      <AnimatedShowcaseLights quality={quality} scrollProgress={scrollProgress} />
      <EnergyFocalPoint scrollProgress={scrollProgress} />
      <EnergyParticles quality={quality} scrollProgress={scrollProgress} />
      <group ref={rootRef}>
        <CentralNovaraLogo
          orbitConfig={activeOrbitConfig}
          orbitStateRef={orbitStateRef}
          quality={quality}
        />
        {products.slice(0, 4).map((product, index) => (
          <ProductGlassPanel
            config={activePanelSlots[index]!}
            index={index}
            orbitConfig={activeOrbitConfig}
            orbitStateRef={orbitStateRef}
            key={product.id}
            product={product}
          />
        ))}
      </group>
    </>
  );
}

export function HomeHeroProductShowcaseCanvas({
  onReady,
  products,
  quality,
}: HomeHeroProductShowcaseCanvasProps) {
  const isMobileQuality = quality === "mobile";

  return (
    <div aria-hidden="true" className="absolute inset-0 pointer-events-auto">
      <Canvas
        camera={{
          far: 32,
          fov: isMobileQuality ? 48 : 37,
          near: 0.1,
          position: isMobileQuality ? [0.28, -0.16, 7.55] : [0.08, 0.16, 6.45],
        }}
        dpr={isMobileQuality ? [1, 1.12] : [1, 1.45]}
        gl={{
          alpha: true,
          antialias: !isMobileQuality,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          gl.outputColorSpace = SRGBColorSpace;
          gl.toneMapping = ACESFilmicToneMapping;
        }}
      >
        <Suspense fallback={null}>
          <ProductShowcaseScene onReady={onReady} products={products} quality={quality} />
        </Suspense>
      </Canvas>
    </div>
  );
}
