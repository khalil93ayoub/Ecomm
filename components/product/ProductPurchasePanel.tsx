"use client";

import { useEffect, useState } from "react";

import { Price } from "@/components/product/Price";
import { StockLabel } from "@/components/product/StockLabel";
import { getDefaultVariant } from "@/lib/products/helpers";
import { getProductPaymentLink } from "@/lib/products/payment-links";
import { cn } from "@/lib/utils/cn";
import type { Product } from "@/types/product";

type ProductPurchasePanelProps = {
  product: Product;
};

const purchaseTrustItems = [
  "Secure Stripe checkout",
  "Free shipping over 50 EUR",
  "30-day returns",
  "Support available",
];

export function ProductPurchasePanel({ product }: ProductPurchasePanelProps) {
  const defaultVariant = getDefaultVariant(product);
  const [selectedVariantId, setSelectedVariantId] = useState(defaultVariant.id);
  const [isMobileBarVisible, setIsMobileBarVisible] = useState(false);
  const selectedVariant =
    product.variants.find((variant) => variant.id === selectedVariantId) ?? defaultVariant;
  const isSoldOut = selectedVariant.stockQuantity <= 0;
  const paymentLink = getProductPaymentLink(product);
  const buyNowHref = !isSoldOut ? paymentLink : undefined;

  useEffect(() => {
    function updateMobileBarVisibility() {
      const revealPoint = Math.max(360, window.innerHeight * 0.55);

      setIsMobileBarVisible(window.scrollY > revealPoint);
    }

    updateMobileBarVisibility();
    window.addEventListener("scroll", updateMobileBarVisibility, { passive: true });
    window.addEventListener("resize", updateMobileBarVisibility);

    return () => {
      window.removeEventListener("scroll", updateMobileBarVisibility);
      window.removeEventListener("resize", updateMobileBarVisibility);
    };
  }, []);

  function handleSelectVariant(variantId: string) {
    const nextVariant = product.variants.find((variant) => variant.id === variantId);

    if (!nextVariant) {
      return;
    }

    setSelectedVariantId(nextVariant.id);
  }


  return (
    <>
      <div
        className="grid gap-5 rounded-md border border-white/12 bg-white/[0.055] p-5 text-white shadow-[0_26px_90px_rgb(0_0_0_/_28%)] backdrop-blur-md lg:p-6"
        data-product-purchase-panel
      >
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-novara-gold-soft">
            {selectedVariant.name}
          </p>
          <h1 className="text-3xl font-semibold leading-tight md:text-4xl">{product.name}</h1>
          <p className="mt-3 leading-7 text-white/68">{product.shortDescription}</p>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-3xl font-semibold">
            <Price amountCents={selectedVariant.priceCents} currency={selectedVariant.currency} />
          </p>
          <StockLabel stockQuantity={selectedVariant.stockQuantity} />
        </div>

        <div className="grid gap-3 border-t border-white/10 pt-4">
          <span className="text-sm font-semibold">Configuration</span>
          <div className="grid gap-2">
            {product.variants.map((variant) => {
              const isSelected = variant.id === selectedVariant.id;
              const isUnavailable = variant.stockQuantity <= 0;

              return (
                <button
                  aria-pressed={isSelected}
                  className={cn(
                    "touch-feedback flex min-h-12 items-center justify-between gap-4 rounded-md border px-4 text-left text-sm font-semibold",
                    isSelected
                      ? "border-novara-gold bg-novara-gold/12 text-white"
                      : "border-white/14 bg-white/[0.045] text-white/78 hover:border-novara-gold/70 hover:text-white",
                  )}
                  disabled={isUnavailable && !isSelected}
                  key={variant.id}
                  onClick={() => handleSelectVariant(variant.id)}
                  type="button"
                >
                  <span>{variant.name}</span>
                  <span className="text-xs uppercase tracking-wide text-white/48">
                    {isUnavailable ? "Sold out" : "Available"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {buyNowHref ? (
          <a
            className="touch-feedback inline-flex min-h-12 w-full items-center justify-center rounded-md bg-white px-5 text-sm font-semibold text-novara-black transition hover:bg-novara-ivory"
            data-payment-link={buyNowHref}
            href={buyNowHref}
          >
            Buy Now
          </a>
        ) : (
          <button
            className="inline-flex min-h-12 w-full cursor-not-allowed items-center justify-center rounded-md border border-white/14 bg-white/8 px-5 text-sm font-semibold text-white/54"
            disabled
            type="button"
          >
            {isSoldOut ? "Sold out" : "Checkout unavailable"}
          </button>
        )}

        <div className="grid gap-3 border-t border-white/10 pt-4">
          <p className="text-sm font-semibold">Delivery</p>
          <p className="text-sm leading-6 text-white/62">{product.shippingReturnsSummary}</p>
        </div>

        <ul className="grid gap-2 border-t border-white/10 pt-4 text-sm text-white/66 sm:grid-cols-2">
          {purchaseTrustItems.map((item) => (
            <li className="flex items-center gap-2" key={item}>
              <span aria-hidden="true" className="size-1.5 rounded-full bg-novara-gold" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-30 border-t border-white/12 bg-novara-black/94 px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 text-white shadow-premium backdrop-blur-md transition duration-300 md:hidden",
          isMobileBarVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0",
        )}
      >
        <div className="mx-auto grid max-w-md grid-cols-[1fr_auto] items-center gap-3">
          <div>
            <p className="truncate text-sm font-semibold">{product.name}</p>
            <p className="text-sm text-white/60">
              <Price amountCents={selectedVariant.priceCents} currency={selectedVariant.currency} />
            </p>
          </div>
          {buyNowHref ? (
            <a
              className="touch-feedback inline-flex min-h-11 items-center justify-center rounded-md bg-white px-5 text-sm font-semibold text-novara-black"
              href={buyNowHref}
            >
              Buy Now
            </a>
          ) : (
            <button
              className="inline-flex min-h-11 cursor-not-allowed items-center justify-center rounded-md border border-white/14 bg-white/8 px-4 text-sm font-semibold text-white/54"
              disabled
              type="button"
            >
              {isSoldOut ? "Sold out" : "Unavailable"}
            </button>
          )}
        </div>
      </div>
    </>
  );
}
