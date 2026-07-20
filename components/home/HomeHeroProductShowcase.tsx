"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";

import { SceneErrorBoundary } from "@/components/three/SceneErrorBoundary";
import { useDeviceCapability } from "@/hooks/useDeviceCapability";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotionPreference } from "@/hooks/useReducedMotionPreference";
import { useWebGLSupport } from "@/hooks/useWebGLSupport";
import { cn } from "@/lib/utils/cn";

export type HeroShowcaseProduct = {
  id: string;
  image: {
    alt: string;
    src: string;
  };
  name: string;
  slug: string;
};

export type HeroShowcaseQuality = "desktop" | "mobile";

type HomeHeroProductShowcaseProps = {
  products: HeroShowcaseProduct[];
};

const LazyShowcaseCanvas = dynamic(
  () =>
    import("@/components/home/HomeHeroProductShowcaseCanvas").then(
      (module) => module.HomeHeroProductShowcaseCanvas,
    ),
  {
    loading: () => null,
    ssr: false,
  },
);

function ProductShowcaseFallback({
  isDimmed,
  products,
}: HomeHeroProductShowcaseProps & {
  isDimmed: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0 transition-opacity duration-700",
        isDimmed ? "opacity-0" : "opacity-100",
      )}
    >
      <div className="absolute inset-y-[50%] left-[32%] right-[-18%] rounded-[2rem] bg-[radial-gradient(ellipse_at_55%_45%,rgb(199_155_72_/_28%),transparent_38%),linear-gradient(135deg,rgb(255_255_255_/_10%),rgb(255_255_255_/_2%))] blur-sm md:inset-y-[16%] md:left-[20%] md:right-[4%]" />
      <div className="absolute bottom-[-10%] left-[42%] right-[-24%] grid grid-cols-2 items-center gap-3 md:inset-y-[15%] md:left-auto md:right-[3%] md:w-[82%] md:grid-cols-4 md:gap-4">
        {products.map((product, index) => (
          <div
            className={cn(
              "relative aspect-[3/4] overflow-hidden rounded-md border border-white/22 bg-white/[0.055] shadow-[0_22px_80px_rgb(0_0_0_/_42%)] backdrop-blur-md",
              index === 1 || index === 2
                ? "translate-y-[-4%] scale-105 md:translate-y-[-3%]"
                : "translate-y-[8%] scale-90 opacity-80 md:translate-y-[5%]",
            )}
            key={product.id}
          >
            {product.image.src ? (
              <Image
                alt=""
                className="object-cover opacity-90 mix-blend-screen"
                fill
                sizes="(max-width: 767px) 30vw, 18vw"
                src={product.image.src}
              />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export function HomeHeroProductShowcase({ products }: HomeHeroProductShowcaseProps) {
  const [isReady, setIsReady] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);
  const webGLSupport = useWebGLSupport();
  const capability = useDeviceCapability(900);
  const isDesktopViewport = useMediaQuery("(min-width: 768px)");
  const prefersReducedMotion = useReducedMotionPreference();
  const quality: HeroShowcaseQuality =
    isDesktopViewport && capability === "capable" ? "desktop" : "mobile";
  const canRenderScene =
    products.length >= 4 &&
    !hasFailed &&
    !prefersReducedMotion &&
    webGLSupport === "supported" &&
    capability !== "checking";

  return (
    <div
      className="pointer-events-none absolute inset-0 z-10 md:inset-y-0 md:left-auto md:right-0 md:w-[66%]"
      data-hero-product-showcase="true"
      data-showcase-quality={quality}
      data-showcase-state={isReady ? "ready" : canRenderScene ? "loading" : "fallback"}
    >
      <ProductShowcaseFallback isDimmed={isReady} products={products} />
      {canRenderScene ? (
        <SceneErrorBoundary
          fallback={<ProductShowcaseFallback isDimmed={false} products={products} />}
          onError={() => setHasFailed(true)}
        >
          <LazyShowcaseCanvas onReady={() => setIsReady(true)} products={products} quality={quality} />
        </SceneErrorBoundary>
      ) : null}
    </div>
  );
}
