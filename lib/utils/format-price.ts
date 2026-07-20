import type { CurrencyCode } from "@/types/product";

export function formatPrice(priceCents: number, currency: CurrencyCode = "EUR") {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency,
  }).format(priceCents / 100);
}
