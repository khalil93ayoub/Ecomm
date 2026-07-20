import type { Product } from "@/types/product";

const stripePaymentLinkPattern = /^https:\/\/buy\.stripe\.com\/[A-Za-z0-9_]+$/;

export function isValidStripePaymentLink(link: string | undefined): link is string {
  return Boolean(link && stripePaymentLinkPattern.test(link) && !link.includes("YOUR_STRIPE_LINK"));
}

export function getProductPaymentLink(product: Product) {
  return isValidStripePaymentLink(product.stripePaymentLink)
    ? product.stripePaymentLink
    : undefined;
}

export function canPurchaseWithPaymentLink(product: Product) {
  const hasStock = product.variants.some((variant) => variant.stockQuantity > 0);

  return hasStock && Boolean(getProductPaymentLink(product));
}
