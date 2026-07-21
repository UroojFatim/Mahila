"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { EASE } from "@/components/motion/variants";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const Hero = () => {
  return (
    <section className="max-w-screen-2xl mx-auto px-6 md:px-10 lg:px-12 py-14 lg:py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14 items-center overflow-hidden">
      {/* Left: copy */}
      <motion.div initial="hidden" animate="visible" variants={container}>
        <motion.div
          variants={item}
          className="text-[13px] tracking-[0.18em] text-olive-light uppercase mb-4"
        >
          Autumn Edit · 2026
        </motion.div>
        <motion.h1
          variants={item}
          className="font-serif text-4xl sm:text-5xl lg:text-[56px] leading-[1.08] text-ink mb-5"
        >
          Quiet elegance,
          <br />
          <span className="italic text-olive">worn daily.</span>
        </motion.h1>
        <motion.p
          variants={item}
          className="text-base lg:text-[17px] leading-relaxed text-ink/60 max-w-[420px] mb-8"
        >
          Considered silhouettes and natural fabrics, designed for women who
          dress with intention. Small batches, made to last seasons — not
          weeks.
        </motion.p>
        <motion.div variants={item} className="flex flex-wrap gap-4">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/all-products"
              className="inline-flex items-center justify-center bg-ink text-cream px-8 py-3.5 text-[13px] tracking-[0.08em] uppercase transition-colors hover:bg-olive"
            >
              Shop Women
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/virtual-try-on"
              className="inline-flex items-center justify-center border border-ink text-ink px-8 py-3.5 text-[13px] tracking-[0.08em] uppercase transition-colors hover:border-olive hover:text-olive"
            >
              See AI Try-On
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Right: olive gradient panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, x: 24 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
        className="relative h-[380px] sm:h-[460px] lg:h-[520px]"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src="/home-hero.png"
            alt="Mahila hero"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 24, x: -12 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.6 }}
          whileHover={{ y: -4 }}
          className="absolute left-0 sm:-left-7 bottom-6 sm:bottom-[-28px] bg-cream border border-hairline p-6 max-w-[230px] shadow-lg"
        >
          <div className="font-script text-xl text-olive mb-1">
            New Arrivals
          </div>
          <div className="text-[13px] text-ink/70 leading-relaxed">
            The Linen Edit — breathable layers for warm days.
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
