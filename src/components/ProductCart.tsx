"use client";

import Image from "next/image";
import { FC, useMemo, useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

export const colorClass: Record<string, string> = {
  black: "bg-black",
  white: "bg-white border",
  navy: "bg-blue-900",
  "navy blue": "bg-blue-900",
  gray: "bg-gray-400",
  grey: "bg-gray-400",
  pink: "bg-pink-300",
  "shocking pink": "bg-pink-500",
  red: "bg-red-500",
  blue: "bg-blue-500",
  "light blue": "bg-blue-300",
  "dark blue": "bg-blue-800",
  beige: "bg-[#e7d3b1]",
  brown: "bg-amber-700",
  orange: "bg-orange-500",
  yellow: "bg-yellow-400",
  maroon: "bg-red-900",
  "dark brown": "bg-amber-900",
  green: "bg-green-500",
  "dark green": "bg-green-800",
  "mehndi green": "bg-emerald-700",
  purple: "bg-purple-500",
  magenta: "bg-fuchsia-500",
  "aqua blue": "bg-cyan-400",
  teal: "bg-teal-600",
  "light teal": "bg-teal-300",
  "blue/green": "bg-emerald-500",
  gold: "bg-yellow-600",
  peach: "bg-orange-300",
  mustard: "bg-yellow-700",
  "black/silver": "bg-gray-800",
  "red and black": "bg-red-700",
  "black floral": "bg-gray-900",
};

const ProductCard: FC<{
  item: any;
  linkTo?: string;
  onColorSelect?: () => void;
}> = ({ item, linkTo, onColorSelect }) => {
  const [hovered, setHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [wishlisted, setWishlisted] = useState(false);

  // Extract data from MongoDB product structure
  const variants = useMemo(() => item?.variants || [], [item?.variants]);
  const firstVariant = variants[0];

  // Get all unique colors from variants
  const colors = useMemo(() => {
    return variants.map((v: any) => v.color).filter(Boolean);
  }, [variants]);

  // Get all unique sizes from all variants
  const sizes = useMemo(() => {
    const sizeSet = new Set<string>();
    variants.forEach((variant: any) => {
      (variant.sizes || []).forEach((s: any) => {
        if (s.size) sizeSet.add(s.size);
      });
    });
    return Array.from(sizeSet);
  }, [variants]);

  // Get current variant based on selected color or first variant
  const currentVariant = useMemo(() => {
    if (selectedColor) {
      return (
        variants.find(
          (v: any) => v.color?.toLowerCase() === selectedColor.toLowerCase(),
        ) || firstVariant
      );
    }
    return firstVariant;
  }, [selectedColor, variants, firstVariant]);

  // Get images for current variant
  const currentImages = currentVariant?.images || [];
  const img0 = currentImages[0]?.url || "";
  const img1 = currentImages[1]?.url || null;

  const imageUrl = useMemo(() => {
    if (hovered && img1) return img1;
    return img0 || "";
  }, [hovered, img0, img1]);

  return (
    <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}>
    <Link
      href={linkTo ?? "#"}
      className="group block relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-tint-1">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={item?.title || "Product"}
            fill
            className="object-cover object-top transition duration-500 group-hover:scale-[1.06]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-serif italic text-[90px] text-black/[0.08]">
              {(item?.title || "M").charAt(0)}
            </span>
          </div>
        )}

        {/* Tag */}
        {item?.tags && item.tags.length > 0 && (
          <motion.span
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="absolute left-3 top-3 bg-ink text-cream text-[10px] tracking-[0.08em] uppercase px-2.5 py-1"
          >
            {item.tags[0]}
          </motion.span>
        )}

        {/* Wishlist */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.8 }}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setWishlisted((w) => !w);
          }}
          aria-label="Toggle wishlist"
          className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-cream/90 flex items-center justify-center overflow-visible"
        >
          <motion.span
            key={wishlisted ? "on" : "off"}
            initial={{ scale: 0.6 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
            className="flex items-center justify-center"
          >
            <Heart
              className="h-3.5 w-3.5"
              fill={wishlisted ? "#9c3f34" : "none"}
              stroke={wishlisted ? "#9c3f34" : "#1C1C1A"}
              strokeWidth={1.6}
            />
          </motion.span>
        </motion.button>

        {/* Hover reveal bar */}
        <span className="absolute left-3 right-3 bottom-3 bg-ink text-cream text-center py-2.5 text-xs tracking-[0.06em] uppercase opacity-0 translate-y-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0">
          View Details
        </span>
      </div>

      {/* Info */}
      <div className="pt-3.5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-normal text-sm text-ink leading-snug line-clamp-1">
            {item?.title}
          </h3>
          <p className="text-sm text-olive whitespace-nowrap">
            Rs. {item?.basePrice}
          </p>
        </div>

        {/* style label */}
        {(item?.styleName || item?.style) && (
          <p className="mt-1 text-[11px] uppercase tracking-[0.06em] text-ink/40">
            {item.styleName || item.style}
          </p>
        )}

        {/* color swatches */}
        {colors.length > 0 && (
          <div className="mt-2.5 flex items-center gap-1.5 flex-wrap">
            {colors.map((color: string, idx: number) => {
              const selected =
                selectedColor?.toLowerCase() === color?.toLowerCase();
              const normalizedColor = color.toLowerCase().replace(/\s+/g, " ");
              return (
                <motion.button
                  key={color + idx}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setSelectedColor(color);
                    onColorSelect?.();
                  }}
                  className={`flex items-center gap-1.5 px-1.5 py-1 rounded-full transition-all ${selected ? "ring-1 ring-ink" : ""}`}
                  aria-label={`Select ${color}`}
                  title={color}
                >
                  <span
                    className={`inline-block h-3.5 w-3.5 rounded-full ${colorClass[normalizedColor] ?? "bg-hairline"} border border-hairline`}
                  />
                </motion.button>
              );
            })}
          </div>
        )}

        {/* sizes */}
        {sizes.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {sizes.slice(0, 5).map((size: string, idx: number) => (
              <span
                key={idx}
                className="text-[10px] tracking-[0.04em] px-1.5 py-0.5 text-ink/50"
              >
                {String(size).toUpperCase()}
              </span>
            ))}
            {sizes.length > 5 && (
              <span className="text-[10px] tracking-[0.04em] px-1.5 py-0.5 text-ink/50">
                +{sizes.length - 5}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
    </motion.div>
  );
};

export default ProductCard;
