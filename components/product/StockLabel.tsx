import { getStockStatus } from "@/lib/products/helpers";
import type { StockStatus } from "@/types/product";

type StockLabelProps = {
  stockQuantity: number;
};

const stockLabels: Record<StockStatus, string> = {
  in_stock: "In stock",
  low_stock: "Low stock",
  out_of_stock: "Sold out",
};

export function StockLabel({ stockQuantity }: StockLabelProps) {
  const status = getStockStatus(stockQuantity);

  return (
    <span
      className="text-sm font-semibold data-[stock-status=in_stock]:text-novara-success data-[stock-status=low_stock]:text-novara-gold data-[stock-status=out_of_stock]:text-novara-danger"
      data-stock-status={status}
    >
      {stockLabels[status]}
    </span>
  );
}
