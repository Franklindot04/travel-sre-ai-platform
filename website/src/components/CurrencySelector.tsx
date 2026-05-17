"use client";

import { useEffect, useRef, useState } from "react";

const currencies = [
  { code: "EUR", symbol: "€" },
  { code: "USD", symbol: "$" },
  { code: "GBP", symbol: "£" },
  { code: "CAD", symbol: "$" },
  { code: "AUD", symbol: "$" },
  { code: "JPY", symbol: "¥" },
  { code: "CHF", symbol: "Fr" },
];

export default function CurrencySelector() {
  const [open, setOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const selectorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (
        selectorRef.current &&
        !selectorRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  return (
    <div className="relative" ref={selectorRef}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex items-center gap-2 rounded-md px-2 py-1 text-slate-200 transition hover:bg-white/10 hover:text-sky-200"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <span>{selectedCurrency.code}</span>
        <span className="text-slate-300">{selectedCurrency.symbol}</span>
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute right-0 z-30 mt-2 w-36 overflow-hidden rounded-lg border border-slate-200 bg-white py-1 text-sm text-slate-900 shadow-xl dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
        >
          {currencies.map((currency) => (
            <button
              key={currency.code}
              type="button"
              role="menuitem"
              onClick={() => {
                setSelectedCurrency(currency);
                setOpen(false);
              }}
              className="flex w-full items-center justify-between gap-3 px-3 py-2 text-left transition hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <span>{currency.code}</span>
              <span className="font-semibold">{currency.symbol}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
