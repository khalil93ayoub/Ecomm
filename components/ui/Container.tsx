import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function Container({ children, className, ...props }: ContainerProps) {
  return (
    <div className={cn("novara-container", className)} {...props}>
      {children}
    </div>
  );
}
