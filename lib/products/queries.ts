import { collections } from "@/data/collections";
import { products } from "@/data/products";
import { normalizeCategoryKey, productMatchesCollection } from "@/lib/products/categories";
import type { Collection } from "@/types/collection";
import type { Product } from "@/types/product";

export function getAllProducts(): Product[] {
  return products.filter((product) => product.status === "active");
}

export function getFeaturedProducts(): Product[] {
  return getAllProducts().filter((product) => product.featured);
}

export function getProductBySlug(slug: string): Product | undefined {
  return getAllProducts().find((product) => product.slug === slug);
}

export function getRelatedProducts(product: Product): Product[] {
  const relatedSlugs = product.relatedProductSlugs ?? [];

  return relatedSlugs
    .map((slug) => getProductBySlug(slug))
    .filter((relatedProduct): relatedProduct is Product => Boolean(relatedProduct));
}

export function getAllCollections(): Collection[] {
  return collections;
}

export function getFeaturedCollections(): Collection[] {
  return collections.filter((collection) => collection.featured);
}

export function getCollectionBySlug(slug: string): Collection | undefined {
  const normalizedSlug = normalizeCategoryKey(slug);

  return collections.find((collection) =>
    [collection.slug, collection.id, collection.name]
      .map(normalizeCategoryKey)
      .includes(normalizedSlug),
  );
}

export function getProductsByCollectionSlug(slug: string): Product[] {
  const collection = getCollectionBySlug(slug);

  if (!collection) {
    return [];
  }

  return getAllProducts().filter((product) => productMatchesCollection(product, collection));
}
