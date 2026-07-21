/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";

const points = [
  "Online eastern-wear shopping is guesswork — outfits rarely look the way they did in the photos.",
  "Two- and three-piece festive wear is the hardest to judge from a photo, which is why apparel returns run 20–40% industry-wide.",
  "So we built AI Virtual Try-On: upload your photo, see the full outfit rendered on you before you buy.",
  "Less guessing for you, fewer returns for us — and next, a plug-and-play version of this for other small brands.",
];

const WhyMahila = () => {
  return (
    <section className="max-w-screen-2xl mx-auto px-6 md:px-10 lg:px-12 py-16 lg:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left: why we built Mahila, in bullets */}
        <Reveal direction="left">
          <div className="text-[13px] tracking-[0.18em] uppercase text-olive-light mb-4">
            Our Story
          </div>
          <h2 className="font-serif text-3xl lg:text-[38px] leading-[1.15] text-ink mb-6">
            Why we built <span className="italic text-olive">Mahila</span>
          </h2>
          <StaggerGroup stagger={0.12} amount={0.4} className="space-y-4 mb-7 max-w-[480px]">
            {points.map((point) => (
              <StaggerItem key={point} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-olive flex-shrink-0" />
                <span className="text-[15px] leading-relaxed text-ink/65">
                  {point}
                </span>
              </StaggerItem>
            ))}
          </StaggerGroup>
          <Link
            href="/virtual-try-on"
            className="group inline-flex items-center gap-2 text-[13px] tracking-[0.08em] uppercase text-ink border-b border-ink pb-1 hover:text-olive hover:border-olive transition-colors"
          >
            See the Full Story &amp; More Results
            <motion.span
              className="inline-flex"
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
            >
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.8} />
            </motion.span>
          </Link>
        </Reveal>

        {/* Right: AI Virtual Mirror callout, with a result preview */}
        <Reveal
          direction="right"
          delay={0.1}
          className="bg-olive-dark text-cream p-9 lg:p-11"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white p-1 rounded-lg mb-7"
          >
            <img
              src="/tryon-results/featured-result.jpeg"
              alt="An AI Virtual Try-On result — the person's photo, the outfit, and the rendered result side by side"
              className="w-full h-auto"
            />
          </motion.div>
          <div className="text-[13px] tracking-[0.14em] uppercase text-sage mb-3">
            Only at Mahila
          </div>
          <h3 className="font-serif italic text-2xl lg:text-[26px] mb-4">
            See it on you before you buy
          </h3>
          <p className="text-sm leading-relaxed text-[#d8dccb] mb-7">
            Our AI Virtual Mirror lets you upload a photo of yourself and
            preview any Mahila piece worn on you — right from the product
            page. No more guessing how a fit or fabric will actually look
            once it&apos;s on.
          </p>
          <motion.div
            className="inline-block"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link
              href="/all-products"
              className="inline-block bg-cream text-ink px-8 py-3.5 text-[13px] tracking-[0.08em] uppercase"
            >
              Try It On a Piece
            </Link>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
};

export default WhyMahila;
