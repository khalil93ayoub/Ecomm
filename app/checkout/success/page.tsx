import Link from "next/link";

import { PageShell } from "@/components/layout/PageShell";
import { routes } from "@/config/routes";

export default function CheckoutSuccessPage() {
  return (
    <PageShell
      description="Stripe has completed checkout for your NOVARA product."
      title="Thank you"
    >
      <div className="grid gap-5 rounded-md border border-novara-border bg-white p-6">
        <p className="leading-7 text-novara-muted">
          Your checkout was handled securely by Stripe. A payment confirmation and order details
          will be sent to the email address entered during checkout.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-novara-black px-5 text-sm font-semibold text-white"
            href={routes.shop}
          >
            Back to Shop
          </Link>
          <Link
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-novara-border bg-white px-5 text-sm font-semibold text-novara-ink"
            href={routes.home}
          >
            Home
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
