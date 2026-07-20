import { StaggeredReveal } from "@/components/animation/StaggeredReveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

const benefits = [
  {
    title: "Shipping",
    description: "Free shipping over 50 EUR.",
  },
  {
    title: "Warranty",
    description: "Products are quality checked before dispatch.",
  },
  {
    title: "Returns",
    description: "30-day return window for unused products.",
  },
];

export function HomeTrustBenefits() {
  return (
    <Section className="py-8 md:py-10">
      <Container>
        <StaggeredReveal className="grid gap-3 md:grid-cols-3">
          {benefits.map((benefit) => (
            <article className="novara-card min-h-36 p-5" key={benefit.title}>
              <h2 className="font-semibold">{benefit.title}</h2>
              <p className="mt-2 text-sm leading-6 text-novara-muted">{benefit.description}</p>
            </article>
          ))}
        </StaggeredReveal>
      </Container>
    </Section>
  );
}
