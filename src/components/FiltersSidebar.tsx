"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import Reveal from "@/components/motion/Reveal";

const SIZES = ["xs", "s", "m", "l", "xl"];

export default function FiltersSidebar({
  price,
  setPrice,
  sizes,
  setSizes,
  total,
  maxPrice = 10000,
  collections = [],
  selectedCollections = [],
  setSelectedCollections,
}: any) {
  const toggleValue = (
    value: string,
    state: string[],
    setState: (next: string[]) => void,
  ) => {
    if (state.includes(value)) {
      setState(state.filter((item) => item !== value));
    } else {
      setState([...state, value]);
    }
  };

  const priceValue = price[1] ?? maxPrice;
  const priceActive = price[1] !== null;

  const clearAll = () => {
    setPrice([0, null]);
    setSizes([]);
    setSelectedCollections?.([]);
  };

  const activeCount =
    sizes.length + selectedCollections.length + (priceActive ? 1 : 0);

  const collectionName = (slug: string) =>
    collections.find((c: any) => c.slug === slug)?.name ?? slug;

  return (
    <Reveal direction="left">
      <aside className="w-full lg:w-[260px] flex-shrink-0">
        <div className="lg:sticky lg:top-24 bg-white border border-hairline rounded-xl p-5 lg:p-6 shadow-[0_1px_3px_rgba(28,28,26,0.04)]">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={16} className="text-olive" />
              <h3 className="text-[13px] uppercase tracking-[0.08em] text-ink font-semibold">
                Filters
              </h3>
              {activeCount > 0 && (
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-olive text-white text-[10px] font-medium">
                  {activeCount}
                </span>
              )}
            </div>
            {activeCount > 0 && (
              <button
                onClick={clearAll}
                className="text-[11px] uppercase tracking-[0.06em] text-ink/50 hover:text-olive transition-colors"
              >
                Clear all
              </button>
            )}
          </div>

          <p className="text-xs text-ink/50 mb-4 lg:hidden">
            {total} products
          </p>

          <AnimatePresence>
            {activeCount > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="flex flex-wrap gap-1.5 py-3 border-t border-hairline/70 mt-3 mb-1">
                  {priceActive && (
                    <button
                      onClick={() => setPrice([0, null])}
                      className="inline-flex items-center gap-1 rounded-full border border-hairline bg-tint-1 px-2.5 py-1 text-[11px] text-ink/70 hover:border-olive hover:text-olive transition-colors"
                    >
                      Up to Rs. {priceValue}
                      <X size={11} />
                    </button>
                  )}
                  {sizes.map((s: string) => (
                    <button
                      key={s}
                      onClick={() => toggleValue(s, sizes, setSizes)}
                      className="inline-flex items-center gap-1 rounded-full border border-hairline bg-tint-1 px-2.5 py-1 text-[11px] text-ink/70 hover:border-olive hover:text-olive transition-colors uppercase"
                    >
                      {s}
                      <X size={11} />
                    </button>
                  ))}
                  {selectedCollections.map((slug: string) => (
                    <button
                      key={slug}
                      onClick={() =>
                        toggleValue(
                          slug,
                          selectedCollections,
                          setSelectedCollections,
                        )
                      }
                      className="inline-flex items-center gap-1 rounded-full border border-hairline bg-tint-1 px-2.5 py-1 text-[11px] text-ink/70 hover:border-olive hover:text-olive transition-colors"
                    >
                      {collectionName(slug)}
                      <X size={11} />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {collections.length > 0 && (
            <div className="py-5 border-t border-hairline/70">
              <div className="text-[13px] uppercase tracking-[0.06em] text-ink font-medium mb-3.5">
                Collection
              </div>
              <div className="flex flex-col gap-2">
                {collections.map((c: any) => {
                  const active = selectedCollections.includes(c.slug);
                  return (
                    <button
                      key={c.slug}
                      onClick={() =>
                        toggleValue(
                          c.slug,
                          selectedCollections,
                          setSelectedCollections,
                        )
                      }
                      className={`flex items-center gap-2.5 text-left text-sm transition-colors group ${
                        active ? "text-ink" : "text-ink/60 hover:text-ink"
                      }`}
                    >
                      <span
                        className={`w-[15px] h-[15px] flex-shrink-0 border rounded-[3px] flex items-center justify-center transition-colors ${
                          active
                            ? "bg-olive border-olive"
                            : "border-hairline group-hover:border-olive"
                        }`}
                      >
                        {active && (
                          <svg
                            width="9"
                            height="7"
                            viewBox="0 0 9 7"
                            fill="none"
                          >
                            <path
                              d="M1 3.5L3.2 5.7L8 1"
                              stroke="white"
                              strokeWidth="1.4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </span>
                      {c.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="py-5 border-t border-hairline/70">
            <div className="text-[13px] uppercase tracking-[0.06em] text-ink font-medium mb-3.5">
              Size
            </div>
            <div className="flex flex-wrap gap-2">
              {SIZES.map((size) => {
                const active = sizes.includes(size);
                return (
                  <motion.button
                    key={size}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => toggleValue(size, sizes, setSizes)}
                    className={`w-9 h-9 border text-xs flex items-center justify-center rounded-md transition-colors ${
                      active
                        ? "bg-ink text-white border-ink"
                        : "border-hairline text-ink hover:border-olive hover:text-olive"
                    }`}
                  >
                    {size.toUpperCase()}
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div className="pt-5 border-t border-hairline/70">
            <div className="flex items-center justify-between mb-3.5">
              <div className="text-[13px] uppercase tracking-[0.06em] text-ink font-medium">
                Price
              </div>
              <div className="text-[13px] text-olive font-medium">
                Rs. {priceValue}
              </div>
            </div>
            <input
              type="range"
              min={0}
              max={maxPrice}
              value={priceValue}
              onChange={(e) => setPrice([0, Number(e.target.value)])}
              className="w-full accent-olive"
              style={{
                background: `linear-gradient(to right, #7a7a4f ${
                  (priceValue / maxPrice) * 100
                }%, #ded7c6 ${(priceValue / maxPrice) * 100}%)`,
              }}
            />
            <div className="flex justify-between text-[11px] text-ink/40 mt-1.5">
              <span>Rs. 0</span>
              <span>Rs. {maxPrice}</span>
            </div>
          </div>
        </div>
      </aside>
    </Reveal>
  );
}
