import { HeroEntranceTimeline } from "@/components/animation/HeroEntranceTimeline";
import { HomeHeroProductShowcase } from "@/components/home/HomeHeroProductShowcase";
import { LinkButton } from "@/components/ui/LinkButton";
import { routes } from "@/config/routes";
import { getProductImage } from "@/lib/products/helpers";
import type { Product } from "@/types/product";

type HomeHeroProps = {
  products: Product[];
};

const heroImageRolesByProductId = {
  breil: "front",
  cable: "side",
  "magnetic-charger": "detail",
  privateer: "front",
  vacuum: "front",
} as const;

export function HomeHero({ products }: HomeHeroProps) {
  const showcaseProducts = products.slice(0, 4).map((product) => {
    const heroImageRole = heroImageRolesByProductId[product.id as keyof typeof heroImageRolesByProductId] ?? "thumbnail";
    const image = getProductImage(product, heroImageRole);

    return {
      id: product.id,
      image: {
        alt: image?.alt ?? product.name,
        src: image?.src ?? "",
      },
      name: product.name,
      slug: product.slug,
    };
  });

  return (
    <section className="relative grid min-h-[calc(100svh-var(--header-height))] items-start overflow-hidden pb-24 pt-[clamp(5.25rem,14svh,7rem)] md:min-h-[max(620px,calc(100svh-var(--header-height)))] md:items-center md:py-[clamp(3rem,7vh,5.5rem)]">
      <div className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(180deg,rgb(5_5_6_/_99%)_0%,rgb(5_5_6_/_96%)_48%,rgb(5_5_6_/_82%)_70%,rgb(5_5_6_/_34%)_100%)] md:w-[68%] md:bg-[linear-gradient(90deg,rgb(5_5_6_/_97%)_0%,rgb(5_5_6_/_86%)_34%,rgb(5_5_6_/_54%)_50%,rgb(5_5_6_/_18%)_64%,transparent_100%)]" />
      <HomeHeroProductShowcase products={showcaseProducts} />
      <div className="novara-container-wide relative z-30">
        <HeroEntranceTimeline className="max-w-[620px]">
          <p className="novara-eyebrow" data-hero-enter>
            Powering a better standard
          </p>
          <h1 className="mt-4 max-w-[600px] text-[clamp(3.2rem,6vw,6.8rem)] font-semibold leading-[0.9] tracking-0 text-white" data-hero-enter>
            Energy, refined.
          </h1>
          <p className="mt-5 max-w-[470px] text-base leading-7 text-white/72 md:text-lg" data-hero-enter>
            Premium essentials engineered for motion, power, and everyday precision.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3" data-hero-enter>
            <LinkButton className="!bg-white !text-novara-black hover:!bg-novara-ivory" href={routes.shop}>
              Shop Now
            </LinkButton>
            <LinkButton className="border-white/20 !bg-novara-black/80 !text-white shadow-[0_12px_40px_rgb(0_0_0_/_35%)] backdrop-blur-md hover:border-novara-gold hover:!bg-white/12 md:!bg-white/8 md:shadow-none" href={routes.collections} variant="secondary">
              Explore Collections
            </LinkButton>
          </div>
        </HeroEntranceTimeline>
      </div>
    </section>
  );
}
