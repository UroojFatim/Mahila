"use client";

import { motion, type HTMLMotionProps, type Variants } from "framer-motion";
import { ReactNode } from "react";
import { EASE } from "./variants";

type RevealDirection = "up" | "fade" | "left" | "right" | "scale";

const HIDDEN_STATE: Record<RevealDirection, Record<string, number>> = {
  up: { opacity: 0, y: 28 },
  fade: { opacity: 0 },
  left: { opacity: 0, x: -40 },
  right: { opacity: 0, x: 40 },
  scale: { opacity: 0, scale: 0.92 },
};

interface RevealProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
  as?: "div" | "span";
}

/**
 * Scroll-triggered reveal wrapper. Wraps children in a motion.div that
 * animates in once it enters the viewport. Use `direction` to pick the
 * entrance style and `delay` to stagger manually placed instances.
 */
export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  once = true,
  amount = 0.25,
  className,
  as = "div",
  ...rest
}: RevealProps) {
  const variants: Variants = {
    hidden: HIDDEN_STATE[direction],
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: { duration, ease: EASE, delay },
    },
  };

  const Component = as === "span" ? motion.span : motion.div;

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
      className={className}
      {...rest}
    >
      {children}
    </Component>
  );
}
