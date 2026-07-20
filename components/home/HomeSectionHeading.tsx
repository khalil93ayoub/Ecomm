import { cn } from "@/lib/utils/cn";

type HomeSectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
};

export function HomeSectionHeading({
  align = "left",
  description,
  eyebrow,
  tone = "light",
  title,
}: HomeSectionHeadingProps) {
  return (
    <div className={`novara-section-heading ${align === "center" ? "mx-auto text-center" : ""}`}>
      <p className="novara-eyebrow">{eyebrow}</p>
      <h2 className="text-3xl font-semibold leading-tight md:text-5xl">{title}</h2>
      {description ? (
        <p
          className={cn(
            "text-base leading-8 md:text-lg",
            tone === "dark" ? "text-white/66" : "text-novara-muted",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
