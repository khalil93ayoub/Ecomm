import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductBrowser } from "@/components/product/ProductBrowser";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { routes } from "@/config/routes";
import { getAllCollections, getCollectionBySlug, getProductsByCollectionSlug } from "@/lib/products/queries";
import { cn } from "@/lib/utils/cn";

type CollectionPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllCollections().map((collection) => ({
    slug: collection.slug,
  }));
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);

  if (!collection) {
    notFound();
  }

  const collections = getAllCollections();
  const products = getProductsByCollectionSlug(collection.slug);

  return (
    <>
      <Section className="bg-novara-black pb-12 text-white md:pb-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.76fr_1fr] lg:items-end">
            <div className="max-w-2xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-novara-gold">Collection</p>
              <h1 className="text-3xl font-semibold md:text-5xl">{collection.name}</h1>
              <p className="mt-4 leading-7 text-white/62">{collection.description}</p>
              <p className="mt-5 text-sm font-semibold text-novara-gold-soft">
                {products.length} {products.length === 1 ? "product" : "products"}
              </p>
            </div>
            <figure className="relative aspect-[16/9] overflow-hidden rounded-md border border-white/10 bg-white/[0.045]">
              <Image
                alt={collection.image.alt}
                className="object-cover"
                fill
                priority
                sizes="(min-width: 1024px) 48vw, 100vw"
                src={collection.image.src}
              />
            </figure>
          </div>

          <nav aria-label="Browse collections" className="-mx-4 mt-8 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
            {collections.map((item) => {
              const isActive = item.slug === collection.slug;

              return (
                <Link
                  className={cn(
                    "touch-feedback min-h-11 shrink-0 rounded-md border px-4 py-3 text-sm font-semibold",
                    isActive
                      ? "border-white bg-white text-novara-black"
                      : "border-white/14 bg-white/[0.045] text-white hover:border-novara-gold",
                  )}
                  href={routes.collection(item.slug)}
                  key={item.id}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </Container>
      </Section>

      <Section className="bg-novara-ivory pt-10">
        <Container>
          <ProductBrowser
            collections={collections}
            lockedCollectionSlug={collection.slug}
            products={products}
          />
        </Container>
      </Section>
    </>
  );
}
