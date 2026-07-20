import Image from "next/image";
import Link from "next/link";

import { Price } from "@/components/product/Price";
import { LinkButton } from "@/components/ui/LinkButton";
import { Container } from "@/components/ui/Container";
import { routes } from "@/config/routes";
import { getProductImage } from "@/lib/products/helpers";
import type { Collection } from "@/types/collection";
import type { Product } from "@/types/product";

type HomeShowroomIntroProps = {
  collections: Collection[];
  products: Product[];
};

export function HomeShowroomIntro({
  collections,
  products,
}: HomeShowroomIntroProps) {
  const previewProducts = products.slice(0, 2);

  return (
    <section className="border-b border-novara-border bg-novara-ivory py-10 md:py-14">
      <Container className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
        <div className="max-w-xl">
          <p className="novara-eyebrow">Showroom edit</p>
          <h2 className="mt-3 text-2xl font-semibold leading-tight text-novara-ink md:text-4xl">
            Explore the essentials.
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-7 text-novara-muted md:text-base">
            A focused selection of watches, car tools, and charging accessories designed for simple daily use.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {collections.map((collection) => (
              <Link
                className="touch-feedback inline-flex min-h-11 items-center rounded-md border border-novara-border bg-white px-4 text-sm font-semibold text-novara-ink hover:border-novara-gold"
                href={routes.collection(collection.slug)}
                key={collection.id}
              >
                {collection.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {previewProducts.map((product, index) => {
            const image = getProductImage(product, "thumbnail") ?? getProductImage(product, "front") ?? getProductImage(product, "hero");

            return (
              <Link
                className="group grid grid-cols-[112px_1fr] overflow-hidden rounded-md border border-novara-border bg-white shadow-subtle transition duration-300 hover:border-novara-gold/45 hover:shadow-soft sm:block"
                href={routes.product(product.slug)}
                key={product.id}
              >
                <div className="relative aspect-square bg-novara-mist sm:aspect-[4/3]">
                  {image ? (
                    <Image
                      alt={image.alt}
                      className="object-contain p-4 transition duration-300 group-hover:scale-[1.02]"
                      fill
                      priority={index === 0}
                      sizes="(min-width: 1024px) 20vw, (min-width: 640px) 30vw, 100vw"
                      src={image.src}
                    />
                  ) : null}
                </div>
                <div className="grid content-center gap-1 p-4">
                  <p className="text-sm font-semibold leading-snug text-novara-ink">{product.name}</p>
                  <p className="text-sm font-semibold text-novara-gold">
                    <Price amountCents={product.priceCents} currency={product.currency} />
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="lg:col-span-2">
          <LinkButton href={routes.shop}>Shop the full edit</LinkButton>
        </div>
      </Container>
    </section>
  );
}
