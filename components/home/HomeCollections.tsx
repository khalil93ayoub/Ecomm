import { StaggeredReveal } from "@/components/animation/StaggeredReveal";
import { CollectionCard } from "@/components/product/CollectionCard";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getProductsByCollectionSlug } from "@/lib/products/queries";
import { cn } from "@/lib/utils/cn";
import type { Collection } from "@/types/collection";

import { HomeSectionHeading } from "./HomeSectionHeading";

type HomeCollectionsProps = {
  collections: Collection[];
  tone?: "light" | "dark";
};

export function HomeCollections({ collections, tone = "light" }: HomeCollectionsProps) {
  const isDark = tone === "dark";

  return (
    <Section className={cn("relative py-12 md:py-16", isDark ? "text-white" : "bg-novara-ivory")}>
      <Container>
        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <HomeSectionHeading
            description="Move through watches, compact tech, car accessories, and charging essentials."
            eyebrow="Collections"
            tone={tone}
            title="Browse by category."
          />
        </div>
        <StaggeredReveal className="novara-mobile-scroll-row md:grid-cols-2 lg:grid-cols-4">
          {collections.map((collection, index) => (
            <CollectionCard
              className="novara-mobile-scroll-card"
              collection={collection}
              key={collection.id}
              priority={index < 2}
              productCount={getProductsByCollectionSlug(collection.slug).length}
              tone={tone}
            />
          ))}
        </StaggeredReveal>
      </Container>
    </Section>
  );
}
