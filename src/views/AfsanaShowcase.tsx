"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const AfsanaShowcase = () => {
  return (
    <motion.section
      className="bg-white py-10 sm:py-14 lg:py-20"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: { staggerChildren: 0.15 },
        },
      }}
    >
      <div className="mx-auto w-full max-w-screen-2xl px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            className="flex flex-col justify-between gap-6"
            variants={{
              hidden: { opacity: 0, y: 24 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
          >
            <div className="space-y-5">
              <p className="text-[11px] font-medium tracking-[0.24em] text-olive-light uppercase">
                Featured Product
              </p>
              <motion.h2
                className="font-serif text-3xl leading-[1.1] text-[#47523A] sm:text-4xl lg:text-5xl"
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              >
                Afsana
              </motion.h2>
              <motion.h2
                className="font-serif text-base leading-[1.1] text-[#47523A]"
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              >
                From Kalaam Collection
              </motion.h2>
              <p className="max-w-md text-sm leading-7 text-ink/60 sm:text-base">
                Minimal refined detailing with digitally designed silk dupattas
                featuring poetic script and artistic motifs.
              </p>
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              >
                <Link
                  href="/product/afsana-pashmina-co-ord-set"
                  className="inline-flex items-center gap-2 border border-olive px-6 py-3 text-xs uppercase tracking-[0.18em] text-olive transition hover:bg-olive hover:text-white"
                >
                  Shop Now
                  <span aria-hidden className="text-base">
                    →
                  </span>
                </Link>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="relative"
            variants={{
              hidden: { opacity: 0, y: 28, scale: 0.98 },
              show: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.7 },
              },
            }}
          >
            <motion.div
              className="absolute -left-6 bottom-0 h-28 w-12 bg-gold sm:-left-10 sm:h-36 sm:w-20 z-20"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
            />
            <motion.div
              className="relative overflow-hidden bg-tint-2 flex items-center justify-center h-[420px] md:h-[800px] lg:h-[620px]"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
            >
              <span className="font-serif italic text-[160px] text-black/[0.08]">
                A
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex flex-col justify-center items-end gap-6"
            variants={{
              hidden: { opacity: 0, y: 24 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
          >
            <div className="space-y-4">
              <motion.div
                className="overflow-hidden bg-tint-4 flex items-center justify-center h-[240px] w-[240px] sm:h-[280px] sm:w-[280px]"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
              >
                <span className="font-script text-3xl text-black/20">
                  Mahila
                </span>
              </motion.div>
              <div className="space-y-2 flex justify-end">
                <motion.h3
                  className="text-sm font-medium uppercase tracking-[0.08em] text-ink"
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                  }}
                >
                  With Printed Dupattas
                </motion.h3>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default AfsanaShowcase;
