import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-novara-black text-white hover:bg-novara-graphite",
  secondary: "border border-novara-border bg-white text-novara-ink hover:border-novara-gold",
  ghost: "bg-transparent text-novara-ink hover:bg-novara-mist",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    children,
    className,
    variant = "primary",
    type = "button",
    ...props
  },
  ref,
) {
  return (
    <button
      className={cn(
        "touch-feedback inline-flex min-h-11 items-center justify-center rounded-md px-5 text-sm font-semibold",
        "disabled:cursor-not-allowed disabled:opacity-50",
        variantClasses[variant],
        className,
      )}
      ref={ref}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
});
