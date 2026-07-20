import { PageShell } from "@/components/layout/PageShell";
import { LinkButton } from "@/components/ui/LinkButton";
import { routes } from "@/config/routes";

const supportTopics = [
  {
    title: "Before you order",
    text: "Review product descriptions, stock status, included accessories, and specifications on each product page.",
  },
  {
    title: "After checkout",
    text: "Stripe confirms the payment securely. Keep the confirmation details available if you need help with an order.",
  },
  {
    title: "Returns",
    text: "Unused items can be returned within 30 days when they are complete and in their original packaging.",
  },
  {
    title: "Product condition",
    text: "If an item arrives damaged or incomplete, contact support before using it so the case can be reviewed properly.",
  },
];

export default function SupportPage() {
  return (
    <PageShell
      description="Help for orders, product questions, shipping, and returns."
      title="Support"
    >
      <div className="grid gap-6 lg:grid-cols-[0.78fr_1fr]">
        <aside className="rounded-md border border-novara-border bg-white p-6 shadow-subtle">
          <h2 className="text-xl font-semibold">Need help?</h2>
          <p className="mt-3 leading-7 text-novara-muted">
            For order support, include the order reference, the email used at checkout, the product name, and a short description of the issue.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <LinkButton href={routes.contact}>Contact</LinkButton>
            <LinkButton href={routes.shippingReturns} variant="secondary">
              Shipping & Returns
            </LinkButton>
          </div>
        </aside>

        <div className="grid gap-4 sm:grid-cols-2">
          {supportTopics.map((topic) => (
            <article className="rounded-md border border-novara-border bg-novara-ivory p-5" key={topic.title}>
              <h2 className="font-semibold">{topic.title}</h2>
              <p className="mt-2 text-sm leading-6 text-novara-muted">{topic.text}</p>
            </article>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
