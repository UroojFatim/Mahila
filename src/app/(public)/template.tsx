"use client";

import { motion } from "framer-motion";

/**
 * Next.js re-mounts `template.tsx` on every route change (unlike layout.tsx),
 * so this gives every page in the (public) group a consistent enter transition
 * without touching each page file individually.
 */
export default function PublicTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
