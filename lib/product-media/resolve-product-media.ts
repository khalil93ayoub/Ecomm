import type { Product } from "@/types/product";
import type { ProductImageMedia, ProductMediaItem } from "@/types/product-media";

function imageRoleLabel(role?: string) {
  if (!role || role === "hero") {
    return "Hero";
  }

  return role.charAt(0).toUpperCase() + role.slice(1);
}

function resolveProductImages(product: Product): ProductImageMedia[] {
  return product.images
    .filter((image) => image.role !== "thumbnail")
    .map((image, index) => ({
      alt: image.alt,
      height: image.height,
      id: `${product.slug}-image-${image.role ?? index}`,
      label: imageRoleLabel(image.role),
      priority: index === 0,
      src: image.src,
      thumbnail: image.src,
      type: "image",
      width: image.width,
    }));
}

export function resolveProductMedia(product: Product): ProductMediaItem[] {
  const images = resolveProductImages(product);

  return images;
}
