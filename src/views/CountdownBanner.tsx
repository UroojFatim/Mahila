"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import FlipDigit from "@/components/motion/FlipDigit";

const calcParts = (endTime: number) => {
  const diff = Math.max(0, endTime - Date.now());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);
  return [
    { label: "Days", val: String(days).padStart(2, "0") },
    { label: "Hrs", val: String(hours).padStart(2, "0") },
    { label: "Min", val: String(mins).padStart(2, "0") },
    { label: "Sec", val: String(secs).padStart(2, "0") },
  ];
};

const CountdownBanner = () => {
  const endTime = useRef(Date.now() + 3 * 24 * 3600 * 1000);
  const [parts, setParts] = useState(() => calcParts(endTime.current));

  useEffect(() => {
    const t = setInterval(() => setParts(calcParts(endTime.current)), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="max-w-screen-2xl mx-auto px-6 md:px-10 lg:px-12 mt-14">
      <Reveal
        direction="scale"
        className="bg-ink text-cream px-7 sm:px-10 lg:px-12 py-10 lg:py-11 flex flex-wrap items-center justify-between gap-7"
      >
        <div>
          <div className="text-xs tracking-[0.1em] uppercase text-[#c9a86a] mb-2">
            Season Sale · 3 Days Left
          </div>
          <div className="font-serif italic text-2xl lg:text-[26px]">
            Up to 40% off Outerwear
          </div>
        </div>
        <div className="flex gap-3.5">
          {parts.map((p) => (
            <div
              key={p.label}
              className="w-16 h-16 border border-olive flex flex-col items-center justify-center"
            >
              <span className="font-serif text-xl tabular-nums">
                <FlipDigit value={p.val} />
              </span>
              <span className="text-[9px] tracking-[0.06em] uppercase text-[#a8a89e]">
                {p.label}
              </span>
            </div>
          ))}
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
          <Link
            href="/all-products"
            className="inline-block bg-olive text-white px-8 py-3.5 text-[13px] tracking-[0.06em] uppercase"
          >
            Shop Sale
          </Link>
        </motion.div>
      </Reveal>
    </section>
  );
};

export default CountdownBanner;
