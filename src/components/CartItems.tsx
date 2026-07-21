/* eslint-disable react/jsx-key */
"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import Wrapper from "@/components/shared/Wrapper";
import DotsLoadingSpinner from "@/components/DotsLoadingSpinner";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/components/CartContext";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import { EASE } from "@/components/motion/variants";

const titleCase = (value: string) =>
  value
    .replace(/_/g, " ")
    .split(" ")
    .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1) : w))
    .join(" ");

type CartItem = {
  product_id: string;
  product_title: string;
  product_category: string;
  image_url: string;
  unit_price: number;
  product_quantity: number;

  // the ones we want to show
  product_size?: string | null;
  product_color?: string | null;

  // sometimes backend sends different names
  size?: string | null;
  color?: string | null;

  cart_item_id?: string;
};

export default function CartItems() {
  const [products, setProducts] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState(false);

  const { userId, refreshCart } = useCart();

  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const getRowKey = (item: CartItem) => {
    if (item.cart_item_id) return item.cart_item_id;

    const size = ((item.product_size ?? item.size ?? "no-size") || "no-size").toLowerCase();
    const color = ((item.product_color ?? item.color ?? "no-color") || "no-color").toLowerCase();

    return `${item.product_id}__${size}__${color}`;
  };

  useEffect(() => {
    const run = async () => {
      if (!userId) {
        setLoading(false);
        setProducts([]);
        setQuantities({});
        return;
      }

      try {
        setLoading(true);
        const res = await fetch(`/api/cart?user_id=${userId}`, {
          cache: "no-store",
        });
        if (!res.ok)
          throw new Error(`API error: ${res.status} ${res.statusText}`);

        const data = await res.json();
        const cartItems: CartItem[] = Array.isArray(data) ? data : [];

        // ✅ normalize fields so UI always sees product_size/product_color
        const normalized = cartItems.map((it) => ({
          ...it,
          product_size: it.product_size ?? it.size ?? null,
          product_color: it.product_color ?? it.color ?? null,
        }));

        setProducts(normalized);

        const initial: Record<string, number> = {};
        for (const item of normalized) {
          initial[getRowKey(item)] = item.product_quantity ?? 1;
        }
        setQuantities(initial);
      } catch (e) {
        console.error("Error fetching cart:", e);
        setProducts([]);
        setQuantities({});
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [userId, state]);

  // ✅ delete by unique row (using row_key for proper variation handling)
  async function deleteProduct(rowKey: string) {
    try {
      console.log("[DELETE] Attempting to delete with row_key:", rowKey);
      const res = await fetch("/api/cart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          row_key: rowKey,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("[DELETE] API error:", errorText);
        alert("Failed to delete product from cart");
        return;
      }

      const data = await res.json();
      console.log("[DELETE] Response from API:", data);

      if (data.result?.deletedCount === 0) {
        console.warn("[DELETE] No items were deleted. Check if row_key matches.");
        alert("Product not found in cart. Please refresh the page.");
        return;
      }

      console.log("Product deleted successfully");
      setState(!state);
      // ✅ Refresh cart context to update header count
      await refreshCart();
    } catch (error) {
      console.error("Delete product error:", error);
      alert("Error deleting product from cart");
    }
  }

  const totalQuantity = useMemo(() => {
    return Object.values(quantities).reduce((acc, curr) => acc + curr, 0);
  }, [quantities]);

  const totalSubtotal = useMemo(() => {
    return products.reduce((acc, item) => {
      const key = getRowKey(item);
      const q = quantities[key] ?? 1;

      // ✅ Use unit_price directly as the price per item
      const price = item.unit_price;
      if (price === 0 || isNaN(price)) return acc;

      return acc + (isNaN(price) ? 0 : price * q);
    }, 0);
  }, [products, quantities]);

  return (
    <Wrapper>
      <section className="px-2 my-16 lg:my-20">
        <h1 className="font-serif text-2xl sm:text-[28px] lg:text-[30px] text-ink mb-2">
          Your Bag
        </h1>

        {loading ? (
          <div className="mt-8 sm:mt-12">
            <DotsLoadingSpinner />
          </div>
        ) : products.length > 0 ? (
          <div className="flex flex-col lg:flex-row mt-6 lg:mt-8 gap-8 lg:gap-14 items-start">
            <div className="w-full lg:flex-1">
              <div className="hidden sm:grid grid-cols-[96px_1fr_auto_auto] gap-5 border-b border-hairline pb-2.5 mb-1 text-[11px] tracking-[0.08em] uppercase text-ink/40">
                <span></span>
                <span>Item</span>
                <span>Quantity</span>
                <span>Total</span>
              </div>
              <AnimatePresence initial={false}>
              {products.map((item) => {
                const key = getRowKey(item);
                const q = quantities[key] ?? 1;

                // ✅ Use unit_price directly as the price per item
                const price = item.unit_price;
                const subtotal = price * q;

                const size = item.product_size ?? "—";
                const color = item.product_color ?? "—";

                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -24, height: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="flex flex-col sm:grid sm:grid-cols-[96px_1fr_auto_auto] gap-4 sm:gap-5 items-start sm:items-center py-6 border-b border-hairline overflow-hidden"
                    key={key}
                  >
                    <div className="relative w-24 h-28 bg-tint-1 flex-shrink-0">
                      <Image
                        src={item.image_url}
                        fill
                        sizes="96px"
                        className="object-cover"
                        alt={item.product_title}
                      />
                    </div>

                    <div className="w-full">
                      <div className="text-[15px] text-ink leading-tight line-clamp-2">
                        {item.product_title}
                      </div>
                      <div className="mt-1.5 text-xs text-ink/50">
                        Size {size}
                        {color !== "—" ? ` · ${color}` : ""}
                      </div>
                      <h2 className="mt-1.5 text-xs uppercase tracking-[0.04em] text-ink/40">
                        {titleCase(item.product_category || "")}
                      </h2>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          deleteProduct(key);
                        }}
                        className="mt-2 text-xs text-brick underline"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="flex items-center border border-ink h-10">
                      <button
                        className="w-9 h-full flex items-center justify-center"
                        onClick={async () => {
                          const newQ = q - 1;
                          if (newQ >= 1) {
                            setQuantities((prev) => ({
                              ...prev,
                              [key]: newQ,
                            }));
                            await fetch("/api/cart", {
                              method: "PATCH",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({
                                user_id: userId,
                                row_key: key,
                                product_quantity: newQ,
                              }),
                            });
                            await refreshCart();
                          }
                        }}
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm overflow-hidden inline-flex justify-center">
                        <AnimatePresence mode="popLayout" initial={false}>
                          <motion.span
                            key={q}
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 10, opacity: 0 }}
                            transition={{ duration: 0.18 }}
                            className="inline-block"
                          >
                            {q}
                          </motion.span>
                        </AnimatePresence>
                      </span>
                      <button
                        className="w-9 h-full flex items-center justify-center"
                        onClick={async () => {
                          const newQ = q + 1;
                          setQuantities((prev) => ({
                            ...prev,
                            [key]: newQ,
                          }));
                          await fetch("/api/cart", {
                            method: "PATCH",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                              user_id: userId,
                              row_key: key,
                              product_quantity: newQ,
                            }),
                          });
                          await refreshCart();
                        }}
                      >
                        +
                      </button>
                    </div>

                    <div className="text-[15px] text-ink whitespace-nowrap">
                      Rs. {subtotal}
                    </div>
                  </motion.div>
                );
              })}
              </AnimatePresence>

              <Link
                href="/all-products"
                className="inline-block mt-6 text-sm text-olive underline"
              >
                ← Continue Shopping
              </Link>
            </div>

            <Reveal
              direction="right"
              className="bg-tint-1 w-full lg:w-[340px] flex-shrink-0 p-7 sm:p-8 space-y-4 sticky top-24"
            >
              <div className="font-serif text-xl text-ink mb-1">
                Order Summary
              </div>
              <div className="flex justify-between text-sm text-ink/70">
                <span>Quantity</span>
                <span className="font-medium text-ink">{totalQuantity}</span>
              </div>
              <div className="flex justify-between text-[17px] font-serif text-ink border-t border-hairline pt-4">
                <span>Total</span>
                <motion.span key={totalSubtotal} initial={{ opacity: 0.4 }} animate={{ opacity: 1 }}>
                  Rs. {totalSubtotal}
                </motion.span>
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button className="w-full h-[52px]">Proceed To Checkout</Button>
              </motion.div>
              <div className="text-[11px] text-ink/50 text-center pt-1">
                Free returns within 7 days
              </div>
            </Reveal>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex-col items-center flex mt-12 text-center px-4 py-8"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <ShoppingBag className="h-20 w-20 text-ink/20" strokeWidth={1.2} />
            </motion.div>
            <p className="text-base text-ink/60 mt-5 mb-7">
              Your bag is empty.
            </p>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/all-products"
                className="inline-block bg-ink text-cream px-9 py-3.5 text-[13px] tracking-[0.08em] uppercase hover:bg-olive transition-colors"
              >
                Continue Shopping
              </Link>
            </motion.div>
          </motion.div>
        )}
      </section>
    </Wrapper>
  );
}
