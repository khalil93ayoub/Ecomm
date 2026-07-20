import { PageShell } from "@/components/layout/PageShell";
import { LinkButton } from "@/components/ui/LinkButton";
import { routes } from "@/config/routes";

const contactReasons = [
  "Product questions before ordering",
  "Order or payment confirmation help",
  "Return requests within the 30-day window",
  "Damaged, missing, or incorrect items",
];

export default function ContactPage() {
  return (
    <PageShell
      description="Contact NOVARA support with clear order and product details so we can help quickly."
      title="Contact"
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_0.72fr]">
        <div className="rounded-md border border-novara-border bg-white p-6 shadow-subtle md:p-8">
          <h2 className="text-2xl font-semibold">How to contact support</h2>
          <p className="mt-4 leading-8 text-novara-muted">
            Use the support contact connected to your NOVARA order confirmation. If you are asking about an order, include your order reference, checkout email, product name, and photos when the item arrived damaged or incomplete.
          </p>
          <p className="mt-4 leading-8 text-novara-muted">
            For product questions before ordering, include the product name and the detail you want confirmed. We keep replies direct and practical.
          </p>
          <div className="mt-6">
            <LinkButton href={routes.shop}>Continue Shopping</LinkButton>
          </div>
        </div>

        <aside className="rounded-md border border-novara-border bg-novara-black p-6 text-white shadow-premium">
          <h2 className="text-xl font-semibold">Include this</h2>
          <ul className="mt-5 grid gap-3 text-sm leading-6 text-white/72">
            {contactReasons.map((reason) => (
              <li className="border-b border-white/10 pb-3 last:border-b-0 last:pb-0" key={reason}>
                {reason}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </PageShell>
  );
}
