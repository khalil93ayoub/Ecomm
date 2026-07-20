import { PageShell } from "@/components/layout/PageShell";
import { LinkButton } from "@/components/ui/LinkButton";
import { routes } from "@/config/routes";

export default function AboutPage() {
  return (
    <PageShell
      description="NOVARA is a focused store for premium everyday technology, useful accessories, and refined daily tools."
      title="About NOVARA"
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.72fr]">
        <div className="grid gap-5 rounded-md border border-novara-border bg-white p-6 shadow-subtle md:p-8">
          <p className="leading-8 text-novara-muted">
            NOVARA is built around a simple idea: everyday products should feel considered, durable, and easy to use. We select practical essentials across watches, charging, car accessories, and compact technology with a preference for clean design, strong utility, and a calm shopping experience.
          </p>
          <p className="leading-8 text-novara-muted">
            The store is intentionally direct. No accounts are required, checkout is hosted securely by Stripe, and product pages focus on the details customers need before buying.
          </p>
          <div className="pt-2">
            <LinkButton href={routes.shop}>Shop NOVARA</LinkButton>
          </div>
        </div>

        <div className="grid gap-4">
          {[
            {
              title: "Curated essentials",
              text: "Products are selected for daily usefulness, clean styling, and simple ownership.",
            },
            {
              title: "Secure checkout",
              text: "Payments are processed through Stripe-hosted Checkout for a familiar and protected payment flow.",
            },
            {
              title: "Clear support",
              text: "Shipping, returns, and product guidance are written plainly so customers know what to expect.",
            },
          ].map((item) => (
            <article className="rounded-md border border-novara-border bg-novara-ivory p-5" key={item.title}>
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-novara-muted">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
