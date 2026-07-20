import { cn } from "@/lib/utils/cn";

type EnvironmentFallbackProps = {
  className?: string;
  isDimmed?: boolean;
};

export function EnvironmentFallback({ className, isDimmed = false }: EnvironmentFallbackProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0 overflow-hidden bg-[radial-gradient(ellipse_at_72%_26%,rgb(199_155_72_/_24%),transparent_30%),radial-gradient(ellipse_at_36%_46%,rgb(255_255_255_/_10%),transparent_34%),linear-gradient(135deg,#050506_0%,#111417_44%,#050506_100%)] transition-opacity duration-700",
        isDimmed ? "opacity-60" : "opacity-100",
        className,
      )}
    >
      <div className="absolute left-[62%] top-[38%] h-[32vw] max-h-[320px] w-[18vw] max-w-[180px] -translate-x-1/2 -translate-y-1/2 rotate-[-18deg] rounded-md border border-white/10 bg-white/6 shadow-[0_0_80px_rgb(255_255_255_/_6%)] backdrop-blur-md" />
      <div className="absolute left-[76%] top-[48%] h-[28vw] max-h-[280px] w-[16vw] max-w-[160px] -translate-x-1/2 -translate-y-1/2 rotate-[16deg] rounded-md border border-novara-gold/14 bg-novara-gold/6 backdrop-blur" />
      <div className="absolute left-[66%] top-[45%] h-28 w-28 -translate-x-1/2 -translate-y-1/2 bg-novara-gold/14 blur-3xl md:h-44 md:w-44" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-novara-black via-novara-black/58 to-transparent" />
      <div className="absolute inset-y-0 left-0 w-[62%] bg-gradient-to-r from-novara-black via-novara-black/72 to-transparent" />
    </div>
  );
}
