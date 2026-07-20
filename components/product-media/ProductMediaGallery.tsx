"use client";

import { ProductMediaThumbnails } from "@/components/product-media/ProductMediaThumbnails";
import { ProductMediaViewer } from "@/components/product-media/ProductMediaViewer";
import type { ProductMediaItem } from "@/types/product-media";

type ProductMediaGalleryProps = {
  activeIndex: number;
  media: ProductMediaItem[];
  onNext: () => void;
  onPrevious: () => void;
  onSelect: (index: number) => void;
};

export function ProductMediaGallery({
  activeIndex,
  media,
  onNext,
  onPrevious,
  onSelect,
}: ProductMediaGalleryProps) {
  const activeMedia = media[activeIndex];

  if (!activeMedia) {
    return null;
  }

  return (
    <div className="grid gap-4">
      <ProductMediaViewer
        activeIndex={activeIndex}
        canGoNext={activeIndex < media.length - 1}
        canGoPrevious={activeIndex > 0}
        media={activeMedia}
        mediaCount={media.length}
        onNext={onNext}
        onPrevious={onPrevious}
      />
      <ProductMediaThumbnails activeIndex={activeIndex} media={media} onSelect={onSelect} />
    </div>
  );
}
