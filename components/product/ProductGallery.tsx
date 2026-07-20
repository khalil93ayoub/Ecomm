"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils/cn";
import type { ProductImage } from "@/types/product";

type ProductGalleryProps = {
  images: ProductImage[];
};

export function ProductGallery({ images }: ProductGalleryProps) {
  const galleryImages = images.filter((image) => image.role !== "thumbnail");
  const [activeImage, setActiveImage] = useState(galleryImages[0]);

  if (!activeImage) {
    return <div className="aspect-square rounded-md bg-novara-stone" />;
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[88px_1fr]">
      <div
        aria-label="Product media thumbnails"
        className="order-2 flex snap-x gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:order-1 lg:grid lg:content-start lg:overflow-visible lg:pb-0"
      >
        {galleryImages.map((image) => (
          <button
            aria-current={image.src === activeImage.src ? "true" : undefined}
            aria-label={`Show ${image.alt}`}
            className={cn(
              "relative size-20 shrink-0 snap-start overflow-hidden rounded-md border bg-novara-stone transition",
              image.src === activeImage.src ? "border-novara-gold" : "border-novara-border",
            )}
            key={image.src}
            onClick={() => setActiveImage(image)}
            type="button"
          >
            <Image alt={image.alt} className="object-cover" fill sizes="80px" src={image.src} />
          </button>
        ))}
      </div>
      <div className="relative order-1 aspect-square overflow-hidden rounded-md bg-novara-stone lg:order-2">
        <Image
          alt={activeImage.alt}
          className="object-cover"
          fill
          priority
          sizes="(min-width: 1024px) 55vw, 100vw"
          src={activeImage.src}
        />
      </div>
    </div>
  );
}
