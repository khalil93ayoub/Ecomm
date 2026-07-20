import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  children: ReactNode;
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { children, className, label, type = "button", ...props },
  ref,
) {
  return (
    <button
      aria-label={label}
      className={cn(
        "inline-flex size-11 items-center justify-center rounded-md border border-transparent text-novara-ink transition duration-200",
        "hover:border-novara-border hover:bg-novara-mist disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      title={label}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
});
