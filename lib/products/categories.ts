import type { Collection } from "@/types/collection";
import type { Product } from "@/types/product";

export function normalizeCategoryKey(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function productMatchesCollection(product: Product, collection: Collection | string) {
  const collectionKey =
    typeof collection === "string"
      ? normalizeCategoryKey(collection)
      : normalizeCategoryKey(`${collection.slug} ${collection.id} ${collection.name}`);
  const productKeys = [
    product.primaryCollectionSlug,
    ...product.collectionSlugs,
  ].map(normalizeCategoryKey);

  if (productKeys.includes(collectionKey)) {
    return true;
  }

  if (typeof collection === "string") {
    return productKeys.includes(normalizeCategoryKey(collection));
  }

  const collectionKeys = [
    collection.slug,
    collection.id,
    collection.name,
  ].map(normalizeCategoryKey);

  return collectionKeys.some((key) => productKeys.includes(key));
}

export function getProductSearchText(product: Product, collections: Collection[]) {
  const matchingCollections = collections.filter((collection) =>
    productMatchesCollection(product, collection),
  );
  const collectionText = matchingCollections
    .flatMap((collection) => [collection.name, collection.slug, collection.description])
    .join(" ");
  const benefitsText = product.benefits
    .flatMap((benefit) => [benefit.title, benefit.description])
    .join(" ");
  const specificationsText = product.specifications
    .flatMap((specification) => [specification.label, specification.value])
    .join(" ");

  return [
    product.name,
    product.shortDescription,
    product.description,
    product.primaryCollectionSlug,
    ...product.collectionSlugs,
    collectionText,
    benefitsText,
    specificationsText,
  ]
    .join(" ")
    .toLowerCase();
}
