import { PageShell } from "@/components/layout/PageShell";

export default function PrivacyPage() {
  return (
    <PageShell
      description="How NOVARA handles personal information when you browse, shop, and contact support."
      title="Privacy"
    >
      <div className="grid gap-5 rounded-md border border-novara-border bg-white p-6 leading-7 text-novara-muted shadow-subtle md:p-8">
        <section>
          <h2 className="text-xl font-semibold text-novara-ink">Information we use</h2>
          <p className="mt-3">
            NOVARA uses the information needed to operate the store, process guest checkout, deliver orders, prevent fraud, and respond to support requests. This can include contact details, delivery details, order contents, and support messages.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-novara-ink">Payments</h2>
          <p className="mt-3">
            Payments are handled through Stripe-hosted Checkout. NOVARA does not store full card details on this website. Stripe may process payment information according to its own privacy and security standards.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-novara-ink">No accounts or newsletter</h2>
          <p className="mt-3">
            The current storefront is guest checkout only. NOVARA does not provide customer accounts, wishlists, or newsletter signups in this version of the site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-novara-ink">Retention and requests</h2>
          <p className="mt-3">
            Order and support information is kept only as long as needed for customer service, legal, tax, and fraud-prevention purposes. Customers can contact support to request access, correction, or deletion where applicable law allows.
          </p>
        </section>
      </div>
    </PageShell>
  );
}
