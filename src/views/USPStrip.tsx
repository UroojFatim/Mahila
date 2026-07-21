"use client";

import React from "react";
import { motion } from "framer-motion";
import { Truck, Sparkle, RotateCcw, ShieldCheck } from "lucide-react";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";

const usps = [
  {
    title: "Free Shipping",
    sub: "On orders over Rs. 15,000",
    icon: Truck,
  },
  {
    title: "Made to Last",
    sub: "Small-batch, quality first",
    icon: Sparkle,
  },
  {
    title: "Easy Returns",
    sub: "7-day free returns",
    icon: RotateCcw,
  },
  {
    title: "Secure Checkout",
    sub: "Encrypted & protected",
    icon: ShieldCheck,
  },
];

const USPStrip = () => {
  return (
    <section className="bg-tint-1 py-8 px-4">
      <StaggerGroup
        stagger={0.08}
        amount={0.4}
        className="max-w-screen-2xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
      >
        {usps.map((u) => (
          <StaggerItem key={u.title} className="flex items-center gap-3.5">
            <motion.div
              whileHover={{ rotate: -8, scale: 1.08 }}
              transition={{ duration: 0.25 }}
              className="w-10 h-10 rounded-full border border-olive flex items-center justify-center flex-shrink-0"
            >
              <u.icon className="h-4 w-4 text-olive" strokeWidth={1.6} />
            </motion.div>
            <div>
              <div className="text-sm font-medium text-ink">{u.title}</div>
              <div className="text-xs text-ink/60">{u.sub}</div>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
};

export default USPStrip;
