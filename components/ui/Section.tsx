import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

type SectionProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
};

export function Section({ children, className, ...props }: SectionProps) {
  return (
    <section className={cn("novara-section", className)} {...props}>
      {children}
    </section>
  );
}
