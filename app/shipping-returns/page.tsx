import { PageShell } from "@/components/layout/PageShell";

export default function ShippingReturnsPage() {
  return (
    <PageShell
      description="Clear delivery and return expectations for NOVARA orders."
      title="Shipping & Returns"
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {[
          {
            title: "Shipping",
            text: "Orders over 50 EUR qualify for free shipping. Delivery timing depends on the destination and carrier service shown after checkout.",
          },
          {
            title: "Processing",
            text: "Orders are prepared carefully before dispatch. If an item is unavailable, support will review the order before fulfilment continues.",
          },
          {
            title: "Returns",
            text: "Returns are accepted within 30 days when items are unused, complete, and returned with the original packaging and accessories.",
          },
        ].map((item) => (
          <article className="rounded-md border border-novara-border bg-white p-6 shadow-subtle" key={item.title}>
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p className="mt-3 leading-7 text-novara-muted">{item.text}</p>
          </article>
        ))}
      </div>

      <div className="mt-6 rounded-md border border-novara-border bg-novara-ivory p-6 leading-7 text-novara-muted">
        <h2 className="text-xl font-semibold text-novara-ink">Return condition</h2>
        <p className="mt-3">
          Please do not continue using an item if it arrived damaged, incomplete, or incorrect. Contact support with the order reference and clear photos so the case can be reviewed. Approved refunds are returned to the original payment method.
        </p>
      </div>
    </PageShell>
  );
}
