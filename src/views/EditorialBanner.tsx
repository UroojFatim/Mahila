"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Reveal from "@/components/motion/Reveal";

const EditorialBanner = () => {
  return (
    <section className="relative bg-olive-dark text-cream py-20 lg:py-[90px] px-6 text-center overflow-hidden">
      <motion.div
        aria-hidden
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-sage/10 blur-3xl"
      />
      <div className="relative max-w-[640px] mx-auto">
        <Reveal
          direction="up"
          className="text-[13px] tracking-[0.18em] uppercase text-sage mb-4"
        >
          The Linen Edit
        </Reveal>
        <Reveal direction="up" delay={0.1}>
          <h2 className="font-serif italic font-medium text-3xl lg:text-4xl mb-5">
            Fabric that breathes with you through every season.
          </h2>
        </Reveal>
        <Reveal
          direction="up"
          delay={0.2}
          className="text-sm lg:text-[15px] leading-relaxed text-[#d8dccb] mb-8"
        >
          Woven from long-staple flax and finished by hand — each piece
          softens with wear, never losing its shape.
        </Reveal>
        <Reveal direction="up" delay={0.3}>
          <motion.div
            className="inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
          >
            <Link
              href="/all-products"
              className="inline-block bg-cream text-ink px-9 py-3.5 text-[13px] tracking-[0.08em] uppercase"
            >
              See Collection
            </Link>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
};

export default EditorialBanner;
