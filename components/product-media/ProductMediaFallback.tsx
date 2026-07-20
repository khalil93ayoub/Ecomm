import { cn } from "@/lib/utils/cn";

type ProductMediaFallbackProps = {
  className?: string;
  label?: string;
};

export function ProductMediaFallback({
  className,
  label = "Media unavailable",
}: ProductMediaFallbackProps) {
  return (
    <div className={cn("grid aspect-[4/5] place-items-center rounded-md border border-white/10 bg-white/[0.045] p-6 text-center text-white sm:aspect-square", className)}>
      <div>
        <p className="text-sm font-semibold">{label}</p>
        <p className="mt-2 text-sm text-white/58">
          This product media could not be displayed.
        </p>
      </div>
    </div>
  );
}
