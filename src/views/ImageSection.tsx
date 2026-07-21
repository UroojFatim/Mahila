"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface ImageSectionProps {
  desktopSrc: string;
  mobileSrc: string;
  alt?: string;
  collectionName: string;
  collectionSlug: string;
  shopNow?: boolean;
}

export default function ImageSection({
  desktopSrc,
  mobileSrc,
  alt = "Hero Image",
  collectionName,
  collectionSlug,
  shopNow = false,
}: ImageSectionProps) {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Mobile */}
      <motion.div
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 md:hidden block"
      >
        <Image
          src={mobileSrc}
          alt={alt}
          fill
          priority
          sizes="100vw"
          quality={100}
          className="object-cover object-[center_30%]"
        />
      </motion.div>

      {/* Desktop */}
      <motion.div
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 hidden md:block"
      >
        <Image
          src={desktopSrc}
          alt={alt}
          fill
          priority
          sizes="100vw"
          quality={100}
          className="object-cover object-[center_10%]"
        />
      </motion.div>

      {shopNow && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-x-0 bottom-10 flex justify-center"
        >
          <motion.div
            whileHover={{ y: -2 }}
            className="border border-cream"
          >
            <Link
              href={`/collection/${collectionSlug}`}
              className="inline-flex items-center m-1 justify-center bg-ink px-8 py-3.5 text-[13px] tracking-[0.08em] uppercase text-cream transition-colors hover:bg-olive"
              aria-label={`Shop ${collectionName}`}
            >
              Shop Now
            </Link>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
