"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { Button } from "@/components/ui/Button";
import { routes } from "@/config/routes";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useFocusTrap } from "@/hooks/useFocusTrap";

export type SearchProduct = {
  id: string;
  slug: string;
  name: string;
  description: string;
  collectionNames: string[];
  image?: {
    src: string;
    alt: string;
  };
  searchText: string;
};

type ProductSearchProps = {
  products: SearchProduct[];
};

export function ProductSearch({ products }: ProductSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const matches = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return products.slice(0, 4);
    }

    return products
      .filter((product) => {
        return product.searchText.includes(normalizedQuery);
      })
      .slice(0, 6);
  }, [products, query]);

  function openSearch() {
    setIsOpen(true);
    window.setTimeout(() => inputRef.current?.focus(), 0);
  }

  const closeSearch = useCallback(() => {
    setIsOpen(false);
    setQuery("");
  }, []);

  useFocusTrap({
    active: isOpen,
    containerRef: dialogRef,
    initialFocusRef: inputRef,
    onEscape: closeSearch,
  });
  useBodyScrollLock(isOpen);
  const searchOverlay = (
    <div
      aria-modal="true"
      aria-labelledby="novara-search-title"
      className="motion-overlay fixed inset-0 z-[90] p-4"
      role="dialog"
    >
      <button
        aria-label="Close product search"
        className="absolute inset-0 h-full w-full cursor-default bg-novara-black/55 backdrop-blur-sm"
        onClick={closeSearch}
        type="button"
      />
      <div
        className="motion-panel relative mx-auto mt-6 max-h-[calc(100svh-48px)] w-full max-w-2xl overflow-y-auto rounded-md border border-novara-border bg-white p-4 shadow-premium md:mt-10"
        ref={dialogRef}
      >
        <h2 className="sr-only" id="novara-search-title">
          Product search
        </h2>
        <div className="flex items-center gap-3">
          <label className="sr-only" htmlFor="novara-product-search">
            Search products
          </label>
          <input
            className="novara-control w-full px-4"
            id="novara-product-search"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search products"
            ref={inputRef}
            type="search"
            value={query}
          />
          <Button onClick={closeSearch} variant="secondary">
            Close
          </Button>
        </div>
        <div className="mt-4 grid gap-2" role="list">
          {matches.length > 0 ? (
            matches.map((product) => (
              <Link
                className="grid grid-cols-[64px_1fr] items-center gap-4 rounded-md border border-transparent p-2 transition hover:border-novara-border hover:bg-novara-ivory"
                href={routes.product(product.slug)}
                key={product.id}
                onClick={closeSearch}
              >
                <div className="relative size-16 overflow-hidden rounded-md bg-novara-stone">
                  {product.image ? (
                    <Image alt={product.image.alt} className="object-cover" fill sizes="64px" src={product.image.src} />
                  ) : null}
                </div>
                <div>
                  <p className="font-semibold">{product.name}</p>
                  <p className="line-clamp-1 text-sm text-novara-muted">{product.description}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-novara-gold">
                    {product.collectionNames.join(" / ")}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p className="rounded-md bg-novara-ivory p-4 text-sm text-novara-muted">
              No products found.
            </p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Button aria-label="Search products" className="px-3 md:px-5" onClick={openSearch} variant="ghost">
        Search
      </Button>
      {isOpen ? createPortal(searchOverlay, document.body) : null}
    </>
  );
}
