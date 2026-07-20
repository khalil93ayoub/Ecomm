import Link from "next/link";
import type { LinkProps } from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

type LinkButtonVariant = "primary" | "secondary" | "ghost";

type LinkButtonProps = LinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    children: ReactNode;
    variant?: LinkButtonVariant;
  };

const variantClasses: Record<LinkButtonVariant, string> = {
  primary: "bg-novara-black text-white hover:bg-novara-graphite",
  secondary: "border border-novara-border bg-white text-novara-ink hover:border-novara-gold",
  ghost: "bg-transparent text-novara-ink hover:bg-novara-mist",
};

export function LinkButton({
  children,
  className,
  variant = "primary",
  ...props
}: LinkButtonProps) {
  return (
    <Link
      className={cn(
        "touch-feedback inline-flex min-h-11 items-center justify-center rounded-md px-5 text-sm font-semibold",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
