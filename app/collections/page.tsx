import { CollectionCard } from "@/components/product/CollectionCard";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getAllCollections, getProductsByCollectionSlug } from "@/lib/products/queries";

export default function CollectionsPage() {
  const collections = getAllCollections();

  return (
    <Section className="bg-novara-black text-white">
      <Container>
        <div className="mb-10 grid gap-5 md:grid-cols-[0.72fr_1fr] md:items-end">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-novara-gold">Collections</p>
            <h1 className="text-3xl font-semibold md:text-5xl">Shop by collection</h1>
          </div>
          <p className="max-w-xl leading-7 text-white/62 md:ml-auto">
            Focused product groups for watches, tech, car accessories, and charging essentials.
          </p>
        </div>
        <div className="novara-mobile-scroll-row md:grid-cols-2 lg:grid-cols-4">
          {collections.map((collection, index) => (
            <CollectionCard
              className="novara-mobile-scroll-card"
              collection={collection}
              key={collection.id}
              priority={index < 2}
              productCount={getProductsByCollectionSlug(collection.slug).length}
              tone="dark"
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
