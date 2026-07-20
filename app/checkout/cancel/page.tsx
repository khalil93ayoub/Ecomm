import Link from "next/link";

import { PageShell } from "@/components/layout/PageShell";
import { routes } from "@/config/routes";

export default function CheckoutCancelPage() {
  return (
    <PageShell
      description="Your Stripe checkout was canceled. No payment was taken."
      title="Checkout canceled"
    >
      <div className="rounded-md border border-novara-border bg-white p-6">
        <p className="leading-7 text-novara-muted">
          No payment was taken. You can return to the product you were viewing or keep browsing NOVARA.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-novara-black px-5 text-sm font-semibold text-white"
            href={routes.shop}
          >
            Continue Shopping
          </Link>
          <Link
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-novara-border bg-white px-5 text-sm font-semibold text-novara-ink"
            href={routes.contact}
          >
            Contact Support
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
