import { formatPrice } from "@/lib/utils/format-price";
import type { CurrencyCode } from "@/types/product";

type PriceProps = {
  amountCents: number;
  currency?: CurrencyCode;
};

export function Price({ amountCents, currency = "EUR" }: PriceProps) {
  return <span>{formatPrice(amountCents, currency)}</span>;
}
