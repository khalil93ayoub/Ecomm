import Link from "next/link";
import Image from "next/image";

import { Price } from "@/components/product/Price";
import { StockLabel } from "@/components/product/StockLabel";
import { routes } from "@/config/routes";
import { getDefaultVariant, getProductImage } from "@/lib/products/helpers";
import { cn } from "@/lib/utils/cn";
import type { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
  className?: string;
  collectionName?: string;
  priority?: boolean;
  tone?: "light" | "dark";
};

export function ProductCard({
  className,
  collectionName,
  priority = false,
  product,
  tone = "light",
}: ProductCardProps) {
  const variant = getDefaultVariant(product);
  const image = getProductImage(product, "hero");
  const isDark = tone === "dark";

  return (
    <article
      className={cn(
        "group grid h-full overflow-hidden rounded-md border transition duration-300",
        isDark
          ? "border-white/10 bg-white/[0.045] text-white shadow-[0_22px_70px_rgb(0_0_0_/_22%)] hover:border-white/22 hover:bg-white/[0.07]"
          : "border-novara-border bg-white shadow-subtle hover:border-novara-gold/45 hover:shadow-soft",
        className,
      )}
    >
      <Link aria-label={`View ${product.name}`} className="block" href={routes.product(product.slug)}>
        <div className={cn("relative aspect-[4/5] overflow-hidden", isDark ? "bg-white/[0.04]" : "bg-novara-stone")}>
          {image ? (
            <Image
              alt={image.alt}
              className="object-contain p-4 transition duration-500 group-hover:scale-[1.02] md:p-5"
              fill
              priority={priority}
              sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
              src={image.src}
            />
          ) : null}
          {product.featured ? (
            <span className="absolute left-3 top-3 rounded-sm bg-novara-gold px-2 py-1 text-xs font-semibold uppercase text-white">
              Featured
            </span>
          ) : null}
        </div>
      </Link>
      <div className="grid h-full gap-4 p-4">
        <div>
          {collectionName ? (
            <p className={cn("mb-2 text-xs font-semibold uppercase tracking-wide", isDark ? "text-novara-gold-soft" : "text-novara-gold")}>
              {collectionName}
            </p>
          ) : null}
          <Link className="block" href={routes.product(product.slug)}>
            <h3 className="font-semibold leading-tight">{product.name}</h3>
          </Link>
          <p className={cn("mt-2 line-clamp-2 text-sm leading-6", isDark ? "text-white/60" : "text-novara-muted")}>
            {product.shortDescription}
          </p>
        </div>
        <div className="flex items-center justify-between gap-4 text-sm">
          <span className="font-semibold">
            <Price amountCents={variant.priceCents} currency={variant.currency} />
          </span>
          <StockLabel stockQuantity={variant.stockQuantity} />
        </div>
        <div className="mt-auto">
          <Link
            className={cn(
              "inline-flex min-h-11 items-center justify-between rounded-md border px-4 text-sm font-semibold transition",
              isDark
                ? "border-white/14 text-white hover:border-novara-gold hover:bg-white/8"
                : "border-novara-border text-novara-ink hover:border-novara-gold hover:bg-novara-mist",
            )}
            href={routes.product(product.slug)}
          >
            View product
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
