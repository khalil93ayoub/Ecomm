import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { footerNavigation } from "@/config/navigation";
import { routes } from "@/config/routes";

export function Footer() {
  return (
    <footer className="border-t border-novara-border bg-novara-black py-12 text-white">
      <Container className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Link className="text-xl font-bold tracking-wide" href={routes.home}>
            NOVARA
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-7 text-white/68">
            Premium essentials selected for focused daily use. Secure Stripe checkout, fast shipping, and simple returns.
          </p>
        </div>
        <nav className="grid content-start gap-3 text-sm">
          <span className="font-semibold text-white">Shop</span>
          <Link className="text-white/68 transition hover:text-white" href={routes.shop}>Shop</Link>
          <Link className="text-white/68 transition hover:text-white" href={routes.collections}>Collections</Link>
          <Link className="text-white/68 transition hover:text-white" href={routes.about}>About</Link>
          <Link className="text-white/68 transition hover:text-white" href={routes.support}>Support</Link>
        </nav>
        <nav className="grid content-start gap-3 text-sm">
          <span className="font-semibold text-white">Help</span>
          {footerNavigation.map((item) => (
            <Link className="text-white/68 transition hover:text-white" href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>
      <Container className="mt-10 border-t border-white/10 pt-6 text-sm text-white/52">
        Stripe-secure checkout. No account required.
      </Container>
    </footer>
  );
}
