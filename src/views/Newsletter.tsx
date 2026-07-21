"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import { EASE } from "@/components/motion/variants";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const subscribe = () => {
    if (email.includes("@")) setSubscribed(true);
  };

  return (
    <section
      id="contact"
      className="max-w-[900px] mx-auto px-6 py-16 lg:py-[90px] text-center scroll-mt-24"
    >
      <Reveal direction="scale" className="font-script text-2xl lg:text-3xl text-olive mb-3">
        Join the list
      </Reveal>
      <Reveal direction="up" delay={0.05}>
        <h2 className="font-serif text-2xl lg:text-[28px] text-ink mb-3.5">
          10% off your first order
        </h2>
      </Reveal>
      <Reveal direction="up" delay={0.1} className="text-sm text-ink/60 mb-7">
        Sign up for early access to new arrivals and seasonal edits.
      </Reveal>

      <AnimatePresence mode="wait">
        {subscribed ? (
          <motion.div
            key="thanks"
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="text-sm text-olive"
          >
            Thank you — check your inbox to confirm.
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: EASE, delay: 0.15 }}
            className="flex justify-center max-w-[420px] mx-auto"
          >
            <motion.input
              whileFocus={{ scale: 1.01 }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && subscribe()}
              placeholder="Your email address"
              className="flex-1 border border-ink border-r-0 py-3.5 px-4 text-sm bg-white outline-none focus:border-olive transition-colors"
            />
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={subscribe}
              className="bg-ink text-white px-6 py-3.5 text-xs tracking-[0.08em] uppercase hover:bg-olive transition-colors"
            >
              Subscribe
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Newsletter;
