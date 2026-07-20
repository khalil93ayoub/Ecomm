import { StaggeredReveal } from "@/components/animation/StaggeredReveal";
import { ProductCard } from "@/components/product/ProductCard";
import { LinkButton } from "@/components/ui/LinkButton";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { routes } from "@/config/routes";
import { cn } from "@/lib/utils/cn";
import type { Collection } from "@/types/collection";
import type { Product } from "@/types/product";

type HomeFeaturedProductsProps = {
  collections: Collection[];
  products: Product[];
  tone?: "light" | "dark";
};

export function HomeFeaturedProducts({
  collections,
  products,
  tone = "light",
}: HomeFeaturedProductsProps) {
  const featured = products.slice(0, 4);
  const collectionBySlug = new Map(collections.map((collection) => [collection.slug, collection]));
  const isDark = tone === "dark";

  return (
    <Section className={cn("relative py-12 md:py-16", isDark ? "text-white" : "bg-novara-ivory")}>
      <Container>
        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="novara-eyebrow">Curated products</p>
            <h2 className={cn("mt-3 text-3xl font-semibold leading-tight md:text-5xl", isDark ? "text-white" : "text-novara-ink")}>
              Selected for everyday precision.
            </h2>
            <p className={cn("mt-4 max-w-xl", isDark ? "text-white/66" : "text-novara-muted")}>
              Real NOVARA products, ready to explore and purchase securely through Stripe.
            </p>
          </div>
          <LinkButton className={isDark ? "border-white/18 !bg-white/8 !text-white hover:!bg-white/12" : undefined} href={routes.shop} variant="secondary">
            Shop all
          </LinkButton>
        </div>
        <StaggeredReveal className="grid grid-cols-2 gap-4 md:gap-5 lg:grid-cols-4">
          {featured.map((product, index) => (
            <ProductCard
              collectionName={collectionBySlug.get(product.primaryCollectionSlug)?.name}
              key={product.id}
              priority={index < 2}
              product={product}
              tone={tone}
            />
          ))}
        </StaggeredReveal>
      </Container>
    </Section>
  );
}
