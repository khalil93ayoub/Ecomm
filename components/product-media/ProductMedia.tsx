"use client";

import { useCallback, useEffect, useMemo, useState, type KeyboardEvent } from "react";

import { ProductMediaFallback } from "@/components/product-media/ProductMediaFallback";
import { ProductMediaGallery } from "@/components/product-media/ProductMediaGallery";
import type { ProductMediaItem } from "@/types/product-media";

type ProductMediaProps = {
  media: ProductMediaItem[];
  productName: string;
};

function getPreviewSource(media: ProductMediaItem | undefined) {
  return media?.thumbnail ?? media?.src ?? null;
}

export function ProductMedia({ media, productName }: ProductMediaProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const normalizedMedia = useMemo(() => media.filter(Boolean), [media]);
  const activeIndex = normalizedMedia.length > 0 ? Math.min(selectedIndex, normalizedMedia.length - 1) : 0;

  const selectMedia = useCallback(
    (index: number) => {
      if (normalizedMedia.length === 0) {
        return;
      }

      setSelectedIndex(Math.min(Math.max(index, 0), normalizedMedia.length - 1));
    },
    [normalizedMedia.length],
  );

  const goNext = useCallback(() => {
    setSelectedIndex((currentIndex) => Math.min(normalizedMedia.length - 1, currentIndex + 1));
  }, [normalizedMedia.length]);

  const goPrevious = useCallback(() => {
    setSelectedIndex((currentIndex) => Math.max(0, currentIndex - 1));
  }, []);

  useEffect(() => {
    const nextSource = getPreviewSource(normalizedMedia[activeIndex + 1]);

    if (!nextSource) {
      return;
    }

    const image = new window.Image();
    image.src = nextSource;
  }, [activeIndex, normalizedMedia]);

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrevious();
    }
  }

  if (normalizedMedia.length === 0) {
    return <ProductMediaFallback label={`${productName} media unavailable`} />;
  }

  return (
    <section
      aria-label={`${productName} product media`}
      className="grid gap-4"
      onKeyDown={handleKeyDown}
    >
      <ProductMediaGallery
        activeIndex={activeIndex}
        media={normalizedMedia}
        onNext={goNext}
        onPrevious={goPrevious}
        onSelect={selectMedia}
      />
    </section>
  );
}
