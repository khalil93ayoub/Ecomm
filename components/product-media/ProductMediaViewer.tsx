"use client";

import Image from "next/image";
import { useRef, type PointerEvent } from "react";

import type { ProductMediaItem } from "@/types/product-media";

type ProductMediaViewerProps = {
  activeIndex: number;
  canGoNext: boolean;
  canGoPrevious: boolean;
  media: ProductMediaItem;
  mediaCount: number;
  onNext: () => void;
  onPrevious: () => void;
};

function getMediaLabel(media: ProductMediaItem, activeIndex: number, mediaCount: number) {
  return `${media.label} ${activeIndex + 1}/${mediaCount}`;
}

type SwipeStart = {
    x: number;
    y: number;
  } | null;

export function ProductMediaViewer({
  activeIndex,
  canGoNext,
  canGoPrevious,
  media,
  mediaCount,
  onNext,
  onPrevious,
}: ProductMediaViewerProps) {
  const activeLabel = getMediaLabel(media, activeIndex, mediaCount);
  const swipeStartRef = useRef<SwipeStart>(null);

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    swipeStartRef.current = {
      x: event.clientX,
      y: event.clientY,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    const start = swipeStartRef.current;
    swipeStartRef.current = null;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (!start) {
      return;
    }

    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    const isHorizontalSwipe = Math.abs(deltaX) > 48 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2;

    if (!isHorizontalSwipe) {
      return;
    }

    if (deltaX < 0 && canGoNext) {
      onNext();
    }

    if (deltaX > 0 && canGoPrevious) {
      onPrevious();
    }
  }

  function handlePointerCancel(event: PointerEvent<HTMLDivElement>) {
    swipeStartRef.current = null;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  return (
    <div
      aria-label={activeLabel}
      className="relative isolate aspect-[4/5] overflow-hidden rounded-md border border-white/12 bg-[radial-gradient(ellipse_at_50%_20%,rgb(255_255_255_/_12%),transparent_34%),linear-gradient(180deg,rgb(255_255_255_/_5%),rgb(255_255_255_/_2%))] shadow-[0_28px_100px_rgb(0_0_0_/_30%)] sm:aspect-square lg:aspect-[5/6]"
      data-product-media-viewer
      onPointerCancel={handlePointerCancel}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      role="img"
      style={{ touchAction: "pan-y" }}
    >
      <span className="pointer-events-none absolute left-3 top-3 z-20 rounded-sm border border-white/12 bg-novara-black/58 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white/78 shadow-subtle backdrop-blur-md">
        {activeLabel}
      </span>
      <Image
        alt={media.alt}
        className="select-none object-contain p-4 transition-opacity duration-300 ease-[var(--ease-premium)] motion-reduce:transition-none md:p-8"
        draggable={false}
        fill
        key={media.id}
        loading="eager"
        priority={media.priority}
        sizes="(min-width: 1024px) 58vw, 100vw"
        src={media.src}
      />
    </div>
  );
}
