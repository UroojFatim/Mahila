"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const AnnouncementBar = () => {
  return (
    <motion.div
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(90deg, #1C1C1A, #333c29, #1C1C1A, #333c29)",
        backgroundSize: "300% 100%",
      }}
    >
      <motion.div
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 10, ease: "linear", repeat: Infinity }}
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, #1C1C1A, #333c29, #1C1C1A, #333c29)",
          backgroundSize: "300% 100%",
        }}
      />
      <Link
        href="/virtual-try-on"
        className="group relative block text-cream text-center text-[11px] sm:text-xs tracking-[0.08em] uppercase py-2.5 px-4"
      >
        <span className="inline-block transition-transform duration-300 group-hover:-translate-y-[1px]">
          Why we built Mahila: AI Virtual Try-On &nbsp;·&nbsp; See it on you
          before you buy
        </span>
      </Link>
    </motion.div>
  );
};

export default AnnouncementBar;
