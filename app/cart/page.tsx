import Link from "next/link";

import { PageShell } from "@/components/layout/PageShell";
import { routes } from "@/config/routes";

export default function CartPage() {
  return (
    <PageShell
      description="NOVARA checkout is handled directly from each product page with secure Stripe Payment Links."
      title="Ready to shop"
    >
      <div className="grid gap-5 rounded-md border border-novara-border bg-white p-6">
        <p className="leading-7 text-novara-muted">
          NOVARA currently uses direct Buy Now checkout for each product. Choose a product to
          continue to secure Stripe checkout.
        </p>
        <Link
          className="inline-flex min-h-11 w-fit items-center justify-center rounded-md bg-novara-black px-5 text-sm font-semibold text-white"
          href={routes.shop}
        >
          Continue Shopping
        </Link>
      </div>
    </PageShell>
  );
}
