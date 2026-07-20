"use client";

import Image from "next/image";
import { useEffect, useRef, type KeyboardEvent } from "react";

import { cn } from "@/lib/utils/cn";
import type { ProductMediaItem } from "@/types/product-media";

type ProductMediaThumbnailsProps = {
  activeIndex: number;
  media: ProductMediaItem[];
  onSelect: (index: number) => void;
};

function getThumbnailSrc(media: ProductMediaItem) {
  return media.thumbnail ?? media.src;
}

export function ProductMediaThumbnails({
  activeIndex,
  media,
  onSelect,
}: ProductMediaThumbnailsProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    const list = listRef.current;
    const item = itemRefs.current[activeIndex];

    if (!list || !item) {
      return;
    }

    list.scrollTo({
      behavior: "smooth",
      left: item.offsetLeft - (list.clientWidth - item.clientWidth) / 2,
    });
  }, [activeIndex]);

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      onSelect(Math.min(media.length - 1, index + 1));
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      onSelect(Math.max(0, index - 1));
    }

    if (event.key === "Home") {
      event.preventDefault();
      onSelect(0);
    }

    if (event.key === "End") {
      event.preventDefault();
      onSelect(media.length - 1);
    }
  }

  return (
    <div
      aria-label="Product media thumbnails"
      className="flex snap-x gap-3 overflow-x-auto rounded-md border border-white/10 bg-white/[0.035] p-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      ref={listRef}
      role="listbox"
    >
      {media.map((item, index) => {
        const thumbnailSrc = getThumbnailSrc(item);
        const isActive = index === activeIndex;

        return (
          <button
            aria-label={`Show ${item.label}`}
            aria-selected={isActive}
            className={cn(
              "group relative size-20 shrink-0 snap-start overflow-hidden rounded-md border bg-novara-black transition md:size-24",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-novara-gold",
              isActive ? "border-novara-gold" : "border-white/12 hover:border-novara-gold/60",
            )}
            key={item.id}
            onClick={() => onSelect(index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            ref={(node) => {
              itemRefs.current[index] = node;
            }}
            role="option"
            type="button"
          >
            {thumbnailSrc ? (
              <Image alt="" className="object-cover" fill sizes="80px" src={thumbnailSrc} />
            ) : (
              <span className="grid size-full place-items-center px-2 text-center text-xs font-semibold text-white/58">
                {item.label}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
