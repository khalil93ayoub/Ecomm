import { LinkButton } from "@/components/ui/LinkButton";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { routes } from "@/config/routes";

export function HomeBrandStory() {
  return (
    <Section>
      <Container>
        <div className="novara-card grid gap-8 overflow-hidden p-6 md:grid-cols-[1fr_auto] md:items-center md:p-10">
          <div className="max-w-3xl">
            <p className="novara-eyebrow">Brand story</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight md:text-5xl">
              NOVARA is built around fewer, better daily essentials.
            </h2>
            <p className="novara-subtitle mt-4">
              We keep the experience direct: clear products, useful details, guest checkout, and a premium interface that does not get in the way.
            </p>
          </div>
          <LinkButton href={routes.about} variant="secondary">
            About NOVARA
          </LinkButton>
        </div>
      </Container>
    </Section>
  );
}
