import type { ReactNode } from "react";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

type PageShellProps = {
  title: string;
  description?: string;
  children?: ReactNode;
};

export function PageShell({ children, description, title }: PageShellProps) {
  return (
    <Section>
      <Container>
        <div className="max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-novara-gold">NOVARA</p>
          <h1 className="text-3xl font-semibold md:text-5xl">{title}</h1>
          {description ? <p className="mt-4 text-novara-muted">{description}</p> : null}
        </div>
        {children ? <div className="mt-8">{children}</div> : null}
      </Container>
    </Section>
  );
}
