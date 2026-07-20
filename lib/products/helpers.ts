import type { Product, ProductImage, ProductVariant, StockStatus } from "@/types/product";

export function getDefaultVariant(product: Product): ProductVariant {
  const variant = product.variants[0];

  if (!variant) {
    throw new Error(`Product "${product.id}" has no variants.`);
  }

  return variant;
}

export function getStockStatus(stockQuantity: number): StockStatus {
  if (stockQuantity <= 0) {
    return "out_of_stock";
  }

  if (stockQuantity <= 3) {
    return "low_stock";
  }

  return "in_stock";
}

export function isProductInStock(product: Product) {
  return product.variants.some((variant) => variant.stockQuantity > 0);
}

export function getProductImage(product: Product, role: ProductImage["role"] = "thumbnail") {
  return (
    product.images.find((image) => image.role === role) ??
    product.images.find((image) => image.role === "hero") ??
    product.images[0]
  );
}
