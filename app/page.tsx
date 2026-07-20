import { HomeCinematicStage } from "@/components/home/HomeCinematicStage";
import { HomeCollections } from "@/components/home/HomeCollections";
import { HomeFeaturedProducts } from "@/components/home/HomeFeaturedProducts";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeShowroomIntro } from "@/components/home/HomeShowroomIntro";
import { HomeTrustBenefits } from "@/components/home/HomeTrustBenefits";
import {
  getAllCollections,
  getAllProducts,
  getFeaturedProducts,
} from "@/lib/products/queries";

const heroProductIds = ["privateer", "vacuum", "magnetic-charger", "breil"];

export default function HomePage() {
  const collections = getAllCollections();
  const allProducts = getAllProducts();
  const featuredProducts = getFeaturedProducts();
  const heroProducts = heroProductIds
    .map((productId) => allProducts.find((product) => product.id === productId))
    .filter((product): product is NonNullable<typeof product> => Boolean(product));

  return (
    <>
      <HomeCinematicStage>
        <HomeHero products={heroProducts} />
      </HomeCinematicStage>
      <HomeShowroomIntro collections={collections} products={featuredProducts} />
      <HomeFeaturedProducts collections={collections} products={featuredProducts} />
      <HomeCollections collections={collections} />
      <HomeTrustBenefits />
    </>
  );
}
