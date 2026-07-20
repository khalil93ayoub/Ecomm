"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import { ProductCard } from "@/components/product/ProductCard";
import { routes } from "@/config/routes";
import { normalizeCategoryKey, productMatchesCollection } from "@/lib/products/categories";
import { cn } from "@/lib/utils/cn";
import type { Collection } from "@/types/collection";
import type { Product } from "@/types/product";

type StockFilter = "all" | "available" | "sold-out";
type SortMode = "featured" | "price-asc" | "price-desc";

type ProductBrowserProps = {
  products: Product[];
  collections: Collection[];
  initialCollectionSlug?: string;
  lockedCollectionSlug?: string;
  tone?: "light" | "dark";
};

function getValidCollectionSlug(value: string | null, collections: Collection[]) {
  if (!value || value === "all") {
    return "all";
  }

  const normalizedValue = normalizeCategoryKey(value);
  const collection = collections.find((item) =>
    [item.slug, item.id, item.name].map(normalizeCategoryKey).includes(normalizedValue),
  );

  return collection?.slug ?? "all";
}

function getValidStockFilter(value: string | null): StockFilter {
  return value === "available" || value === "sold-out" ? value : "all";
}

function getValidSortMode(value: string | null): SortMode {
  return value === "price-asc" || value === "price-desc" ? value : "featured";
}

function getResultLabel(count: number) {
  return `${count} ${count === 1 ? "product" : "products"}`;
}

export function ProductBrowser({
  collections,
  initialCollectionSlug = "all",
  lockedCollectionSlug,
  products,
  tone = "light",
}: ProductBrowserProps) {
  const lockedCollection = lockedCollectionSlug
    ? getValidCollectionSlug(lockedCollectionSlug, collections)
    : undefined;
  const [collectionSlug, setCollectionSlug] = useState(
    lockedCollection ?? getValidCollectionSlug(initialCollectionSlug, collections),
  );
  const [stockFilter, setStockFilter] = useState<StockFilter>("all");
  const [sortMode, setSortMode] = useState<SortMode>("featured");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const hasHydratedFilters = useRef(false);
  const isDark = tone === "dark";
  const showCollectionControls = !lockedCollection;
  const activeCollectionSlug = lockedCollection ?? collectionSlug;
  const collectionBySlug = useMemo(
    () => new Map(collections.map((collection) => [collection.slug, collection])),
    [collections],
  );

  useEffect(() => {
    function applyParams(params: URLSearchParams) {
      if (!lockedCollection) {
        setCollectionSlug(getValidCollectionSlug(params.get("collection"), collections));
      }

      setStockFilter(getValidStockFilter(params.get("stock")));
      setSortMode(getValidSortMode(params.get("sort")));
    }

    const timeoutId = window.setTimeout(() => {
      hasHydratedFilters.current = true;
      applyParams(new URLSearchParams(window.location.search));
    }, 0);

    function handlePopState() {
      applyParams(new URLSearchParams(window.location.search));
    }

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [collections, lockedCollection]);

  useEffect(() => {
    if (!hasHydratedFilters.current) {
      return;
    }

    const params = new URLSearchParams(window.location.search);

    if (showCollectionControls) {
      if (collectionSlug === "all") {
        params.delete("collection");
      } else {
        params.set("collection", collectionSlug);
      }
    } else {
      params.delete("collection");
    }

    if (stockFilter === "all") {
      params.delete("stock");
    } else {
      params.set("stock", stockFilter);
    }

    if (sortMode === "featured") {
      params.delete("sort");
    } else {
      params.set("sort", sortMode);
    }

    const nextQuery = params.toString();
    const nextUrl = nextQuery ? `${window.location.pathname}?${nextQuery}` : window.location.pathname;

    window.history.replaceState(null, "", nextUrl);
  }, [collectionSlug, showCollectionControls, sortMode, stockFilter]);

  useEffect(() => {
    if (!isFilterOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsFilterOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFilterOpen]);

  const visibleProducts = useMemo(() => {
    const activeCollection = collections.find((collection) => collection.slug === activeCollectionSlug);

    return [...products]
      .filter((product) => {
        if (activeCollectionSlug === "all") {
          return true;
        }

        return activeCollection ? productMatchesCollection(product, activeCollection) : false;
      })
      .filter((product) => {
        if (stockFilter === "available") {
          return product.stockStatus !== "out_of_stock";
        }

        if (stockFilter === "sold-out") {
          return product.stockStatus === "out_of_stock";
        }

        return true;
      })
      .sort((firstProduct, secondProduct) => {
        if (sortMode === "price-asc") {
          return firstProduct.priceCents - secondProduct.priceCents;
        }

        if (sortMode === "price-desc") {
          return secondProduct.priceCents - firstProduct.priceCents;
        }

        return Number(secondProduct.featured ?? false) - Number(firstProduct.featured ?? false);
      });
  }, [activeCollectionSlug, collections, products, sortMode, stockFilter]);

  const activeFilterCount =
    (showCollectionControls && activeCollectionSlug !== "all" ? 1 : 0) +
    (stockFilter !== "all" ? 1 : 0) +
    (sortMode !== "featured" ? 1 : 0);
  const selectClassName = cn(
    "novara-control px-3 text-sm",
    isDark ? "!border-white/14 !bg-novara-black/80 !text-white" : undefined,
  );
  const labelClassName = cn("grid gap-2 text-sm font-semibold", isDark ? "text-white" : "text-novara-ink");
  const panelClassName = cn(
    "rounded-md border p-4",
    isDark ? "border-white/10 bg-white/[0.045]" : "border-novara-border bg-white shadow-subtle",
  );

  function resetFilters() {
    if (showCollectionControls) {
      setCollectionSlug(getValidCollectionSlug(initialCollectionSlug, collections));
    }

    setStockFilter("all");
    setSortMode("featured");
  }

  function renderFilterControls() {
    return (
      <div className={cn("grid gap-4", showCollectionControls ? "md:grid-cols-3" : "md:grid-cols-2")}>
        {showCollectionControls ? (
          <label className={labelClassName}>
            Category
            <select
              className={selectClassName}
              onChange={(event) => setCollectionSlug(event.target.value)}
              value={collectionSlug}
            >
              <option value="all">All categories</option>
              {collections.map((collection) => (
                <option key={collection.slug} value={collection.slug}>
                  {collection.name}
                </option>
              ))}
            </select>
          </label>
        ) : null}
        <label className={labelClassName}>
          Availability
          <select
            className={selectClassName}
            onChange={(event) => setStockFilter(event.target.value as StockFilter)}
            value={stockFilter}
          >
            <option value="all">All availability</option>
            <option value="available">Available only</option>
            <option value="sold-out">Sold out only</option>
          </select>
        </label>
        <label className={labelClassName}>
          Sort
          <select
            className={selectClassName}
            onChange={(event) => setSortMode(event.target.value as SortMode)}
            value={sortMode}
          >
            <option value="featured">Featured first</option>
            <option value="price-asc">Price low to high</option>
            <option value="price-desc">Price high to low</option>
          </select>
        </label>
      </div>
    );
  }

  return (
    <div className={cn("grid gap-7", isDark ? "text-white" : undefined)}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className={cn("text-sm font-semibold", isDark ? "text-white/66" : "text-novara-muted")}>
          {getResultLabel(visibleProducts.length)}
          {activeFilterCount > 0 ? ` · ${activeFilterCount} active ${activeFilterCount === 1 ? "filter" : "filters"}` : null}
        </p>
        <div className="flex items-center gap-2">
          <button
            className={cn(
              "touch-feedback inline-flex min-h-11 items-center rounded-md border px-4 text-sm font-semibold md:hidden",
              isDark
                ? "border-white/14 bg-white/8 text-white"
                : "border-novara-border bg-white text-novara-ink",
            )}
            onClick={() => setIsFilterOpen(true)}
            type="button"
          >
            Filters{activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
          </button>
          <button
            className={cn(
              "touch-feedback inline-flex min-h-11 items-center rounded-md border px-4 text-sm font-semibold",
              isDark
                ? "border-white/14 text-white hover:border-novara-gold"
                : "border-novara-border text-novara-ink hover:border-novara-gold",
            )}
            onClick={resetFilters}
            type="button"
          >
            Reset
          </button>
        </div>
      </div>

      <div className={cn("hidden md:block", panelClassName)}>{renderFilterControls()}</div>

      {showCollectionControls ? (
        <div
          aria-label="Category filters"
          className="-mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
          role="list"
        >
          {[{ slug: "all", name: "All" }, ...collections].map((collection) => {
            const isActive = activeCollectionSlug === collection.slug;

            return (
              <button
                aria-pressed={isActive}
                className={cn(
                  "touch-feedback min-h-11 shrink-0 snap-start rounded-md border px-4 text-sm font-semibold",
                  isActive
                    ? isDark
                      ? "border-white bg-white text-novara-black"
                      : "border-novara-black bg-novara-black text-white"
                    : isDark
                      ? "border-white/14 bg-white/[0.045] text-white hover:border-novara-gold"
                      : "border-novara-border bg-white text-novara-ink hover:border-novara-gold",
                )}
                key={collection.slug}
                onClick={() => setCollectionSlug(collection.slug)}
                type="button"
              >
                {collection.name}
              </button>
            );
          })}
        </div>
      ) : null}

      {visibleProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 md:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {visibleProducts.map((product, index) => (
            <ProductCard
              collectionName={collectionBySlug.get(product.primaryCollectionSlug)?.name}
              key={product.id}
              priority={index < 2}
              product={product}
              tone={tone}
            />
          ))}
        </div>
      ) : (
        <div className={cn("rounded-md border p-8 text-center", isDark ? "border-white/10 bg-white/[0.045]" : "border-novara-border bg-white")}>
          <h2 className="text-lg font-semibold">No products found</h2>
          <p className={cn("mt-2 text-sm", isDark ? "text-white/62" : "text-novara-muted")}>
            Adjust the filters or return to the full shop.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <button
              className={cn(
                "touch-feedback inline-flex min-h-11 items-center rounded-md border px-4 text-sm font-semibold",
                isDark ? "border-white/14 text-white" : "border-novara-border text-novara-ink",
              )}
              onClick={resetFilters}
              type="button"
            >
              Reset filters
            </button>
            <Link
              className={cn(
                "touch-feedback inline-flex min-h-11 items-center rounded-md px-4 text-sm font-semibold",
                isDark ? "bg-white text-novara-black" : "bg-novara-black text-white",
              )}
              href={routes.shop}
            >
              Go to shop
            </Link>
          </div>
        </div>
      )}

      {isFilterOpen ? (
        <div aria-labelledby="product-filter-title" aria-modal="true" className="fixed inset-0 z-50 md:hidden" role="dialog">
          <button
            aria-label="Close filters"
            className="absolute inset-0 bg-novara-black/72"
            onClick={() => setIsFilterOpen(false)}
            type="button"
          />
          <div className="motion-panel absolute inset-x-3 bottom-3 max-h-[calc(100svh-2rem)] overflow-y-auto rounded-md bg-novara-ivory p-5 text-novara-ink shadow-premium">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="novara-eyebrow">Browse</p>
                <h2 className="mt-2 text-2xl font-semibold" id="product-filter-title">
                  Filters
                </h2>
              </div>
              <button
                className="touch-feedback inline-flex min-h-11 items-center rounded-md border border-novara-border px-4 text-sm font-semibold"
                onClick={() => setIsFilterOpen(false)}
                type="button"
              >
                Close
              </button>
            </div>
            {renderFilterControls()}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                className="touch-feedback min-h-11 rounded-md border border-novara-border text-sm font-semibold"
                onClick={resetFilters}
                type="button"
              >
                Reset
              </button>
              <button
                className="touch-feedback min-h-11 rounded-md bg-novara-black text-sm font-semibold text-white"
                onClick={() => setIsFilterOpen(false)}
                type="button"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
