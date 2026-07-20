import Image from "next/image";
import Link from "next/link";

import { routes } from "@/config/routes";
import { cn } from "@/lib/utils/cn";
import type { Collection } from "@/types/collection";

type CollectionCardProps = {
  collection: Collection;
  className?: string;
  productCount: number;
  priority?: boolean;
  tone?: "light" | "dark";
};

export function CollectionCard({
  className,
  collection,
  priority = false,
  productCount,
  tone = "light",
}: CollectionCardProps) {
  const isDark = tone === "dark";

  return (
    <Link
      className={cn(
        "group h-full overflow-hidden rounded-md border transition duration-300",
        isDark
          ? "border-white/10 bg-white/[0.045] text-white hover:border-white/22 hover:bg-white/[0.07]"
          : "border-novara-border bg-white shadow-subtle hover:border-novara-gold/45 hover:shadow-soft",
        className,
      )}
      href={routes.collection(collection.slug)}
    >
      <article className="grid h-full">
        <div className={cn("relative aspect-[4/3] overflow-hidden", isDark ? "bg-white/[0.04]" : "bg-novara-stone")}>
          <Image
            alt={collection.image.alt}
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
            fill
            priority={priority}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            src={collection.image.src}
          />
        </div>
        <div className="grid content-start gap-2 p-4">
          <h2 className="text-lg font-semibold">{collection.name}</h2>
          <p className={cn("text-sm leading-6", isDark ? "text-white/62" : "text-novara-muted")}>{collection.description}</p>
          <span className={cn("text-sm font-semibold", isDark ? "text-novara-gold-soft" : "text-novara-gold")}>
            {productCount} {productCount === 1 ? "product" : "products"}
          </span>
        </div>
      </article>
    </Link>
  );
}
