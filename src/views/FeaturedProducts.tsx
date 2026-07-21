"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import ProductCard from "@/components/ProductCart";
import Reveal from "@/components/motion/Reveal";
import { EASE } from "@/components/motion/variants";

type FeaturedProductsProps = {
  products?: any[];
};

const TABS = ["Bestsellers", "New In", "Trending"] as const;

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>(
    "Bestsellers",
  );

  const safeProducts = Array.isArray(products) ? products : [];

  const sets = useMemo(() => {
    const first8 = safeProducts.slice(0, 8);
    const next8 = safeProducts.slice(8, 16);
    const reversed8 = [...safeProducts].reverse().slice(0, 8);
    return {
      Bestsellers: first8,
      "New In": next8.length > 0 ? next8 : first8,
      Trending: reversed8.length > 0 ? reversed8 : first8,
    };
  }, [safeProducts]);

  const activeProducts = sets[activeTab];

  if (safeProducts.length === 0) return null;

  return (
    <section className="max-w-screen-2xl mx-auto px-6 md:px-10 lg:px-12 py-16 lg:py-20">
      <Reveal
        direction="up"
        className="flex justify-between items-end mb-10 flex-wrap gap-5"
      >
        <div>
          <div className="text-[13px] tracking-[0.18em] text-olive-light uppercase mb-2.5">
            Curated for you
          </div>
          <h2 className="font-serif text-3xl lg:text-[34px] text-ink">
            Featured Pieces
          </h2>
        </div>
        <div className="flex gap-7">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative text-[13px] tracking-[0.05em] pb-1.5 transition-colors ${
                tab === activeTab ? "text-ink" : "text-ink/40"
              }`}
            >
              {tab}
              {tab === activeTab && (
                <motion.span
                  layoutId="featured-tab-underline"
                  className="absolute left-0 right-0 -bottom-px h-px bg-olive"
                  transition={{ duration: 0.3, ease: EASE }}
                />
              )}
            </button>
          ))}
        </div>
      </Reveal>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-6"
        >
          {activeProducts.map((p, i) => (
            <motion.div
              key={p._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE, delay: i * 0.05 }}
            >
              <ProductCard item={p} linkTo={`/product/${p.slug}`} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      <Reveal direction="up" className="text-center mt-11">
        <motion.div
          className="inline-block"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          <Link
            href="/all-products"
            className="inline-block border border-ink px-10 py-3.5 text-[13px] tracking-[0.08em] uppercase transition-all hover:border-olive hover:text-olive"
          >
            View All Products
          </Link>
        </motion.div>
      </Reveal>
    </section>
  );
}
