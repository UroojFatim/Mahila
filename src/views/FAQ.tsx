"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import { EASE } from "@/components/motion/variants";

const faqs = [
  {
    q: "What is the AI Try-On widget?",
    a: "It's a plug-and-play version of our AI Virtual Try-On technology that other e-commerce stores will be able to add to their own product pages — so their shoppers get the same \"see it on you before you buy\" experience Mahila offers.",
  },
  {
    q: "Is the widget available for my brand yet?",
    a: "Not yet — it's actively in development. Mahila is where we're testing and refining the experience first, and we'll share more once it's ready.",
  },
  {
    q: "Will it work with any e-commerce store?",
    a: "That's the goal — we're building it to plug into any online store, not just Mahila.",
  },
  {
    q: "Do I need my own developers to add it to my store?",
    a: "No — that's the whole point of building it as a widget. It's designed to be a simple, plug-and-play integration, not something you need an in-house engineering team for.",
  },
  {
    q: "What if my brand only has on-model photos, not clean product flat-lays?",
    a: "That's fine — our system is built to generate a garment flat-lay directly from an on-model photo, so you don't need studio product shots to use it.",
  },
  {
    q: "Will adding the widget slow down my store?",
    a: "No — the try-on runs asynchronously in the background on its own servers, so it doesn't add load to your store while shoppers browse.",
  },
  {
    q: "How can I get in touch about the widget?",
    a: "Email us at aivirtualtryonmirror@gmail.com and we'll keep you posted as it becomes available.",
  },
];

const FAQ = () => {
  const [open, setOpen] = useState<number>(0);

  return (
    <section className="bg-tint-1 py-16 lg:py-20 px-6">
      <div className="max-w-[800px] mx-auto">
        <Reveal direction="up" className="text-center mb-10">
          <div className="text-[13px] tracking-[0.18em] uppercase text-olive-light mb-2.5">
            Good to know
          </div>
          <h2 className="font-serif text-[26px] lg:text-[30px] text-ink">
            Frequently Asked
          </h2>
        </Reveal>
        {faqs.map((f, i) => (
          <Reveal
            key={f.q}
            direction="up"
            amount={0.5}
            delay={Math.min(i * 0.05, 0.3)}
            className="border-b border-hairline"
          >
            <button
              onClick={() => setOpen((prev) => (prev === i ? -1 : i))}
              className="w-full py-5 px-1 flex justify-between items-center text-left"
            >
              <span className="text-[15px] text-ink">{f.q}</span>
              <motion.span
                animate={{ rotate: open === i ? 45 : 0 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="text-xl text-olive"
              >
                +
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div className="pb-5 px-1 text-sm text-ink/70 leading-relaxed max-w-[640px]">
                    {f.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
