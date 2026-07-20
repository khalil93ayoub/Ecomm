import { Container } from "@/components/ui/Container";
import { ProductBrowser } from "@/components/product/ProductBrowser";
import { Section } from "@/components/ui/Section";
import { getAllCollections, getAllProducts } from "@/lib/products/queries";

export default function ShopPage() {
  const products = getAllProducts();
  const collections = getAllCollections();

  return (
    <Section className="bg-[linear-gradient(180deg,#050505_0%,#171717_230px,var(--color-novara-ivory)_230px,var(--color-novara-ivory)_100%)]">
      <Container>
        <div className="mb-10 grid gap-5 text-white md:grid-cols-[0.72fr_1fr] md:items-end">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-novara-gold">Shop</p>
            <h1 className="text-3xl font-semibold md:text-5xl">All products</h1>
          </div>
          <p className="max-w-xl leading-7 text-white/62 md:ml-auto">
            Browse the full NOVARA edit by category, availability, and price.
          </p>
        </div>
        <ProductBrowser collections={collections} products={products} />
      </Container>
    </Section>
  );
}
