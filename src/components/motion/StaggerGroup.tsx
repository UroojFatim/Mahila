"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";
import { staggerContainer, fadeUp, viewportOnce, EASE } from "./variants";

interface StaggerGroupProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  stagger?: number;
  delayChildren?: number;
  once?: boolean;
  amount?: number;
}

/** Parent wrapper — animates its <StaggerItem> children in sequence on scroll. */
export function StaggerGroup({
  children,
  stagger = 0.09,
  delayChildren = 0,
  once = true,
  amount = 0.2,
  className,
  ...rest
}: StaggerGroupProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={staggerContainer(stagger, delayChildren)}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  y?: number;
}

/** Child item for use inside <StaggerGroup>. */
export function StaggerItem({
  children,
  y = 24,
  className,
  ...rest
}: StaggerItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: EASE },
        },
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export { viewportOnce, fadeUp };
