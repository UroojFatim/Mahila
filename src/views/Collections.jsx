"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const TINTS = [
  "bg-tint-1",
  "bg-tint-2",
  "bg-tint-3",
  "bg-tint-4",
  "bg-tint-5",
  "bg-tint-6",
];

/**
 * @param {{ initialCollections?: Array<{ name: string; slug?: string; image?: string | null }> }} props
 */
export default function Collections({ initialCollections }) {
  const safeCollections = Array.isArray(initialCollections)
    ? initialCollections
    : [];
  const [collections, setCollections] = useState(() =>
    safeCollections
      .map((collection) => ({
        title: collection?.name,
        slug: collection?.slug,
        image: collection?.image ?? null,
      }))
      .filter((collection) => collection.title && collection.slug)
  );
  const hasInitialCollections = safeCollections.length > 0;

  useEffect(() => {
    if (hasInitialCollections) {
      return;
    }

    const loadCollections = async () => {
      try {
        const response = await fetch("/api/public/collections", {
          cache: "no-store",
        });
        const data = await response.json();
        if (data?.ok && Array.isArray(data.collections)) {
          setCollections(
            data.collections
              .map((collection) => ({
                title: collection?.name,
                slug: collection?.slug,
                image: null,
              }))
              .filter((collection) => collection.title && collection.slug)
          );
        }
      } catch (error) {
        console.error("Failed to load collections", error);
      }
    };

    loadCollections();
  }, [hasInitialCollections]);

  const items = collections.slice(0, 4).map((item, index) => ({
    ...item,
    tint: TINTS[index % TINTS.length],
    letter: (item.title || "?").charAt(0).toUpperCase(),
  }));

  return (
    <section className="w-full py-16 bg-cream">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-12 text-center">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <div className="text-[13px] tracking-[0.18em] uppercase text-olive-light mb-2.5">
            Explore
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-ink mb-12">
            Shop by Collection
          </h2>
        </motion.div>

        {/* Category cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {items.map((item, index) => (
            <motion.div
              key={item.slug ?? index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: false, amount: 0.3 }}
              whileHover={{ y: -6 }}
            >
              <Link
                href={`/collection/${item.slug}`}
                className={`${
                  item.image ? "bg-ink" : item.tint
                } group relative flex h-[170px] flex-col justify-between overflow-hidden p-6 text-left shadow-sm transition-shadow duration-300 hover:shadow-xl`}
              >
                {item.image && (
                  <>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* uniform darken so text is legible regardless of what's in the photo */}
                    <div className="absolute inset-0 bg-black/40" />
                    {/* extra depth top + bottom where the text sits */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/60" />
                  </>
                )}

                <span
                  className={`relative font-serif italic text-[15px] ${
                    item.image
                      ? "text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.6)]"
                      : "text-ink"
                  }`}
                >
                  {item.title}
                </span>
                <span
                  className={`relative flex items-center gap-1.5 text-xs font-medium ${
                    item.image
                      ? "text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.6)]"
                      : "text-olive"
                  }`}
                >
                  Shop now
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>

                {!item.image && (
                  <span className="pointer-events-none absolute -right-2.5 -bottom-7 font-serif text-[100px] text-black/5">
                    {item.letter}
                  </span>
                )}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
