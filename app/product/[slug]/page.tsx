import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { ProductMedia } from "@/components/product-media/ProductMedia";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductPurchasePanel } from "@/components/product/ProductPurchasePanel";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { routes } from "@/config/routes";
import { resolveProductMedia } from "@/lib/product-media/resolve-product-media";
import { getProductImage } from "@/lib/products/helpers";
import {
  getAllProducts,
  getCollectionBySlug,
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/products/queries";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllProducts().map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product);
  const productMedia = resolveProductMedia(product);
  const collection = getCollectionBySlug(product.primaryCollectionSlug);
  const storyImage = getProductImage(product, "lifestyle") ?? getProductImage(product, "detail");
  const includedSpecification = product.specifications.find((specification) =>
    specification.label.toLowerCase().includes("included"),
  );
  const visibleSpecifications = product.specifications.filter(
    (specification) => specification !== includedSpecification,
  );
  const includedItems =
    includedSpecification?.value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean) ?? [];

  return (
    <div className="bg-novara-black pb-28 text-white md:pb-0">
      <Section className="relative overflow-hidden pt-6 md:pt-[var(--space-section-md)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_18%_8%,rgb(199_155_72_/_18%),transparent_34%),radial-gradient(ellipse_at_84%_16%,rgb(255_255_255_/_9%),transparent_30%),linear-gradient(180deg,#050506_0%,#101112_56%,#050506_100%)]" />
        <Container>
          <nav aria-label="Breadcrumb" className="relative z-10 mb-6 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-white/42">
            <Link className="transition hover:text-novara-gold" href={routes.shop}>
              Shop
            </Link>
            {collection ? (
              <>
                <span aria-hidden="true">/</span>
                <Link className="transition hover:text-novara-gold" href={routes.collection(collection.slug)}>
                  {collection.name}
                </Link>
              </>
            ) : null}
            <span aria-hidden="true">/</span>
            <span className="text-novara-gold-soft">{product.name}</span>
          </nav>

          <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1.12fr)_minmax(370px,0.88fr)] lg:items-start">
            <ProductMedia media={productMedia} productName={product.name} />
            <div className="grid gap-5 lg:sticky lg:top-[calc(var(--header-height)+28px)]">
              <ProductPurchasePanel product={product} />
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-white/10 py-0">
        <Container>
          <div className="grid divide-y divide-white/10 border-x border-white/10 md:grid-cols-4 md:divide-x md:divide-y-0">
            {["Secure checkout", "Fast shipping", "30-day returns", "Responsive support"].map((item) => (
              <div className="px-5 py-5" key={item}>
                <p className="text-sm font-semibold">{item}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            {storyImage ? (
              <figure className="relative aspect-[4/5] overflow-hidden rounded-md border border-white/10 bg-white/[0.045] md:aspect-[16/12]">
                <Image
                  alt={storyImage.alt}
                  className="object-cover"
                  fill
                  sizes="(min-width: 1024px) 46vw, 100vw"
                  src={storyImage.src}
                />
              </figure>
            ) : null}
            <div>
              <p className="novara-eyebrow">Overview</p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-5xl">
                Designed to feel considered from first use.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/68">{product.description}</p>
              {product.benefits.length > 0 ? (
                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  {product.benefits.map((benefit) => (
                    <article className="border-t border-white/12 pt-4" key={benefit.title}>
                      <h3 className="font-semibold">{benefit.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-white/58">{benefit.description}</p>
                    </article>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
            <section className="rounded-md border border-white/10 bg-white/[0.045] p-6 md:p-8">
              <p className="novara-eyebrow">Details</p>
              <h2 className="mt-3 text-2xl font-semibold">Specifications</h2>
              {visibleSpecifications.length > 0 ? (
                <dl className="mt-6 grid">
                  {visibleSpecifications.map((specification) => (
                    <div
                      className="grid gap-1 border-t border-white/10 py-4 sm:grid-cols-[180px_1fr]"
                      key={specification.label}
                    >
                      <dt className="text-sm font-semibold text-white">{specification.label}</dt>
                      <dd className="text-sm leading-6 text-white/62">{specification.value}</dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="mt-5 text-sm leading-6 text-white/62">Specifications are being finalized for this product.</p>
              )}
            </section>

            <div className="grid gap-5">
              <section className="rounded-md border border-white/10 bg-white/[0.045] p-6 md:p-8">
                <p className="novara-eyebrow">In the box</p>
                <h2 className="mt-3 text-2xl font-semibold">What&apos;s included</h2>
                {includedItems.length > 0 ? (
                  <ul className="mt-6 grid gap-3 text-sm text-white/66">
                    {includedItems.map((item) => (
                      <li className="flex gap-3" key={item}>
                        <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-novara-gold" />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-5 text-sm leading-6 text-white/62">Included items are listed on the order page when available.</p>
                )}
              </section>

              <section className="rounded-md border border-white/10 bg-white/[0.045] p-6 md:p-8">
                <p className="novara-eyebrow">Shipping</p>
                <h2 className="mt-3 text-2xl font-semibold">Shipping & returns</h2>
                <p className="mt-5 text-sm leading-7 text-white/62">{product.shippingReturnsSummary}</p>
              </section>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-novara-gold">Related</p>
              <h2 className="text-2xl font-semibold">Complete your setup</h2>
            </div>
          </div>
          {relatedProducts.length > 0 ? (
            <div className="novara-mobile-scroll-row md:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  className="novara-mobile-scroll-card"
                  key={relatedProduct.id}
                  product={relatedProduct}
                  tone="dark"
                />
              ))}
            </div>
          ) : (
            <div className="rounded-md border border-white/10 bg-white/[0.045] p-8 text-center">
              <p className="text-sm text-white/62">No related products are configured yet.</p>
            </div>
          )}
        </Container>
      </Section>
    </div>
  );
}
