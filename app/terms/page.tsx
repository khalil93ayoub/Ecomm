import { PageShell } from "@/components/layout/PageShell";

export default function TermsPage() {
  return (
    <PageShell
      description="The basic terms for browsing NOVARA and purchasing products through guest checkout."
      title="Terms"
    >
      <div className="grid gap-5 rounded-md border border-novara-border bg-white p-6 leading-7 text-novara-muted shadow-subtle md:p-8">
        <section>
          <h2 className="text-xl font-semibold text-novara-ink">Store use</h2>
          <p className="mt-3">
            NOVARA provides product information and guest checkout for customers buying everyday technology, watches, chargers, and accessories. By using the storefront, you agree to use it lawfully and not interfere with its operation.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-novara-ink">Products and availability</h2>
          <p className="mt-3">
            Product descriptions, images, stock status, and prices are shown as clearly as possible. Availability can change before checkout is completed. Prices are listed in EUR.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-novara-ink">Checkout and payment</h2>
          <p className="mt-3">
            Checkout is hosted by Stripe Payment Links. Each Buy Now button opens the Stripe checkout page for that specific product. If checkout is cancelled or payment fails, no payment is taken.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-novara-ink">Returns and rights</h2>
          <p className="mt-3">
            Returns are accepted within 30 days for unused items returned complete and in their original packaging. These terms do not limit any mandatory consumer rights that apply in Germany or the European Union.
          </p>
        </section>
      </div>
    </PageShell>
  );
}
