import Link from "next/link";
import Image from "next/image";

import { HeaderScrollTransition } from "@/components/animation/HeaderScrollTransition";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { ProductSearch } from "@/components/search/ProductSearch";
import { Container } from "@/components/ui/Container";
import { primaryNavigation } from "@/config/navigation";
import { routes } from "@/config/routes";
import { getProductImage } from "@/lib/products/helpers";
import { getProductSearchText, productMatchesCollection } from "@/lib/products/categories";
import { getAllCollections, getAllProducts } from "@/lib/products/queries";

export function Header() {
  const collections = getAllCollections();
  const searchProducts = getAllProducts().map((product) => {
    const image = getProductImage(product, "thumbnail");
    const productCollections = collections.filter((collection) =>
      productMatchesCollection(product, collection),
    );

    return {
      id: product.id,
      slug: product.slug,
      name: product.name,
      description: product.shortDescription,
      collectionNames: productCollections.map((collection) => collection.name),
      image: image
        ? {
            src: image.src,
            alt: image.alt,
          }
        : undefined,
      searchText: getProductSearchText(product, collections),
    };
  });
  const menuItems = [
    ...primaryNavigation,
    { label: "Featured Products", href: `${routes.shop}?sort=featured` },
    ...collections.map((collection) => ({
      label: collection.name,
      href: routes.collection(collection.slug),
    })),
    { label: "Contact", href: routes.contact },
    { label: "Shipping & Returns", href: routes.shippingReturns },
  ];

  return (
    <header className="novara-header sticky top-0 z-40 border-b border-novara-border bg-novara-ivory/92 shadow-[0_1px_0_rgb(255_255_255_/_60%)] backdrop-blur-md transition-colors duration-300" id="novara-site-header">
      <HeaderScrollTransition targetId="novara-site-header" />
      <AnnouncementBar />
      <Container className="flex min-h-[var(--header-height)] items-center justify-between gap-3 lg:gap-6">
        <Link className="relative block h-11 w-11 shrink-0 lg:h-10 lg:w-44" href={routes.home}>
          <Image
            alt="NOVARA"
            className="object-contain lg:hidden"
            fill
            priority
            sizes="44px"
            src="/images/brand/logo-mobile.jpg"
          />
          <Image
            alt="NOVARA"
            className="hidden object-contain object-left lg:block"
            fill
            priority
            sizes="176px"
            src="/images/brand/logo-desktop.jpg"
          />
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-semibold lg:flex">
          {primaryNavigation.map((item) => (
            <Link className="transition hover:text-novara-gold" href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 lg:gap-3">
          <div className="hidden lg:block">
            <ProductSearch products={searchProducts} />
          </div>
          <div className="lg:hidden">
            <ProductSearch products={searchProducts} />
          </div>
          <MobileMenu items={menuItems} />
        </div>
      </Container>
    </header>
  );
}
