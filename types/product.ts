export type CurrencyCode = "EUR";

export type ProductStatus = "active" | "draft";

export type StockStatus = "in_stock" | "low_stock" | "out_of_stock";

export type ProductImage = {
  src: string;
  alt: string;
  role?: "hero" | "front" | "side" | "detail" | "lifestyle" | "thumbnail";
  width?: number;
  height?: number;
};

export type ProductBenefit = {
  title: string;
  description: string;
};

export type ProductSpecification = {
  label: string;
  value: string;
};

export type ProductVariant = {
  id: string;
  productId: string;
  name: string;
  sku: string;
  priceCents: number;
  currency: CurrencyCode;
  stockQuantity: number;
  attributes?: Record<string, string>;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  priceCents: number;
  currency: CurrencyCode;
  primaryCollectionSlug: string;
  collectionSlugs: string[];
  stockStatus: StockStatus;
  images: ProductImage[];
  benefits: ProductBenefit[];
  specifications: ProductSpecification[];
  shippingReturnsSummary: string;
  stripePaymentLink?: string;
  variants: ProductVariant[];
  status: ProductStatus;
  featured?: boolean;
  relatedProductSlugs?: string[];
};
