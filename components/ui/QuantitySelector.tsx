"use client";

import { Button } from "@/components/ui/Button";

type QuantitySelectorProps = {
  value: number;
  min?: number;
  max: number;
  onChange: (value: number) => void;
};

export function QuantitySelector({ value, min = 1, max, onChange }: QuantitySelectorProps) {
  const decrement = () => onChange(Math.max(min, value - 1));
  const increment = () => onChange(Math.min(max, value + 1));

  return (
    <div className="inline-grid w-fit grid-cols-[44px_56px_44px] overflow-hidden rounded-md border border-novara-border bg-white">
      <Button aria-label="Decrease quantity" className="rounded-none px-0" disabled={value <= min} onClick={decrement} variant="ghost">
        -
      </Button>
      <output className="grid place-items-center border-x border-novara-border text-sm font-semibold">{value}</output>
      <Button aria-label="Increase quantity" className="rounded-none px-0" disabled={value >= max} onClick={increment} variant="ghost">
        +
      </Button>
    </div>
  );
}
