"use client";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "./CartContext";

const CartButton = () => {
  const { cartItemCount } = useCart();
  const [bump, setBump] = useState(false);
  const prevCount = useRef(cartItemCount);

  useEffect(() => {
    if (cartItemCount > prevCount.current) {
      setBump(true);
      const t = setTimeout(() => setBump(false), 400);
      prevCount.current = cartItemCount;
      return () => clearTimeout(t);
    }
    prevCount.current = cartItemCount;
  }, [cartItemCount]);

  return (
    <Link href="/cart">
      <motion.button
        aria-label="Cart"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        animate={{ rotate: bump ? [0, -12, 10, -6, 0] : 0 }}
        transition={{ duration: 0.4, type: "tween", ease: "easeInOut" }}
        className="relative p-2 rounded-full hover:bg-ink/5 transition"
      >
        <ShoppingCart className="h-[19px] w-[19px] text-ink" strokeWidth={1.6} />
        <AnimatePresence>
          {cartItemCount > 0 && (
            <motion.div
              key={cartItemCount}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
              className={`absolute z-10 -top-1 -right-1 text-center bg-olive text-[10px] text-white rounded-full h-4 w-4 flex items-center justify-center ${
                bump ? "animate-bump" : ""
              }`}
            >
              {cartItemCount}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </Link>
  );
};

export default CartButton;
