import type { HTMLAttributes, ReactNode } from "react";

import { revealClasses } from "@/lib/animations/motion";
import { cn } from "@/lib/utils/cn";

type RevealProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function Reveal({ children, className, ...props }: RevealProps) {
  return (
    <div className={cn(revealClasses, className)} {...props}>
      {children}
    </div>
  );
}
