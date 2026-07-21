/* eslint-disable react/jsx-no-undef */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useMemo, useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Sparkles } from "lucide-react";
import { useCart } from "@/components/CartContext";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import VirtualTryOnModal from "@/components/VirtualTryOnModal";
import ProductCard, { colorClass } from "@/components/ProductCart";
import Reveal from "@/components/motion/Reveal";
import { EASE } from "@/components/motion/variants";

const titleCase = (value: string) =>
  value
    .replace(/_/g, " ")
    .split(" ")
    .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1) : w))
    .join(" ");

const normalize = (v: string | null | undefined) =>
  (v ?? "").toString().trim().toLowerCase();

const ProductDetails = ({
  foundData,
  relatedProducts,
}: {
  foundData: any;
  relatedProducts?: any[];
}) => {
  const [num, setNum] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState<number>(0);

  // ✅ Extract data from MongoDB structure (variants)
  const variants = useMemo(
    () => foundData?.variants || [],
    [foundData?.variants],
  );

  // Get all unique sizes from all variants (only those with stock > 0)
  const sizesFromVariants: string[] = useMemo(() => {
    const sizeSet = new Set<string>();
    variants.forEach((variant: any) => {
      (variant.sizes || []).forEach((s: any) => {
        if (s.size && s.quantity > 0) sizeSet.add(s.size);
      });
    });
    return Array.from(sizeSet);
  }, [variants]);

  // Get all unique colors from variants (only those with at least one size in stock)
  const colorsFromVariants: string[] = useMemo(() => {
    return variants
      .filter((v: any) => {
        // Check if this variant has at least one size with stock
        return v.sizes?.some((s: any) => s.quantity > 0);
      })
      .map((v: any) => v.color)
      .filter(Boolean);
  }, [variants]);

  const hasSizes = sizesFromVariants.length > 0;
  const hasColors = colorsFromVariants.length > 0;

  const [selectedSize, setSelectedSize] = useState<string | null>(
    sizesFromVariants.length > 0 ? sizesFromVariants[0] : null,
  );
  const [selectedColor, setSelectedColor] = useState<string | null>(
    colorsFromVariants.length > 0 ? colorsFromVariants[0] : null,
  );

  const [isLoading, setIsLoading] = useState(false);
  const [tryOnOpen, setTryOnOpen] = useState(false);

  // ✅ IMPORTANT: prefer refreshCart (badge count should come from backend)
  const { userId, refreshCart } = useCart();

  // Get current variant based on selected color
  const currentVariant = useMemo(() => {
    if (selectedColor) {
      return (
        variants.find(
          (v: any) => v.color?.toLowerCase() === selectedColor.toLowerCase(),
        ) || variants[0]
      );
    }
    return variants[0];
  }, [selectedColor, variants]);

  // Get all images from all variants for display
  const allProductImages = useMemo(() => {
    const images: any[] = [];
    variants.forEach((variant: any) => {
      if (variant.images && Array.isArray(variant.images)) {
        // Only include images with valid URLs
        const validImages = variant.images.filter((img: any) => img?.url && img.url.trim() !== "");
        images.push(...validImages);
      }
    });
    return images;
  }, [variants]);

  // Track selected image for main display
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Get images from current variant
  const productImages = useMemo(() => {
    return currentVariant?.images || [];
  }, [currentVariant]);

  // ✅ build variant key so same product with different size/color becomes different row
  const rowKey = useMemo(() => {
    const pid = foundData?._id ?? "no-product";
    const size = hasSizes ? normalize(selectedSize) || "no-size" : "no-size";
    const color = hasColors
      ? normalize(selectedColor) || "no-color"
      : "no-color";
    return `${pid}__${size}__${color}`;
  }, [foundData?._id, selectedSize, selectedColor, hasSizes, hasColors]);

  // Get available stock for selected size and color
  const availableStock = useMemo(() => {
    if (!selectedSize || !selectedColor) return null;

    const variant = variants.find(
      (v: any) => v.color?.toLowerCase() === selectedColor.toLowerCase(),
    );

    if (!variant) return null;

    const sizeObj = variant.sizes?.find(
      (s: any) => s.size?.toLowerCase() === selectedSize.toLowerCase(),
    );

    return sizeObj?.quantity ?? 0;
  }, [selectedSize, selectedColor, variants]);

  // Calculate final price based on selected size/color and their price adjustment
  const finalPrice = useMemo(() => {
    const basePrice = Number(foundData?.basePrice || 0);

    if (!selectedSize || !selectedColor) return basePrice;

    const variant = variants.find(
      (v: any) => v.color?.toLowerCase() === selectedColor.toLowerCase(),
    );

    if (!variant) return basePrice;

    const sizeObj = variant.sizes?.find(
      (s: any) => s.size?.toLowerCase() === selectedSize.toLowerCase(),
    );

    const priceDelta = Number(sizeObj?.priceDelta || 0);
    return basePrice + priceDelta;
  }, [selectedSize, selectedColor, variants, foundData?.basePrice]);

  // Update main image when color changes
  useEffect(() => {
    if (!selectedColor || !currentVariant?.images?.[0]) return;

    // Find the index of the first image of the current variant in allProductImages
    const firstVariantImage = currentVariant.images[0];
    const indexInAll = allProductImages.findIndex(
      (img: any) => img.url === firstVariantImage.url,
    );

    if (indexInAll !== -1) {
      setSelectedImageIndex(indexInAll);
    }
  }, [selectedColor, currentVariant, allProductImages]);

  const handleAddToCart = async () => {
    if (!userId) {
      toast.error("Please login first!", {
        autoClose: 3000,
        position: "top-center",
      });
      return;
    }

    // ✅ Only require what actually exists
    if (hasSizes && !selectedSize) {
      toast.error("Please select a size!", {
        autoClose: 3000,
        position: "top-center",
      });
      return;
    }
    if (hasColors && !selectedColor) {
      toast.error("Please select a color!", {
        autoClose: 3000,
        position: "top-center",
      });
      return;
    }

    // Check stock availability
    if (availableStock !== null && availableStock === 0) {
      toast.error("This item is out of stock!", {
        autoClose: 3000,
        position: "top-center",
      });
      return;
    }

    if (availableStock !== null && num > availableStock) {
      toast.error(`Only ${availableStock} items available in stock!`, {
        autoClose: 3000,
        position: "top-center",
      });
      return;
    }

    setIsLoading(true);

    try {
      const mainImageUrl = productImages[0]?.url || "";

      // ✅ pass ALL useful attributes
      const payload = {
        user_id: userId,

        // product identity
        product_id: foundData?._id,
        product_title: foundData?.title ?? "",
        product_slug: foundData?.slug ?? null,

        // pricing + quantity
        unit_price: finalPrice,
        product_price: finalPrice * num,
        product_quantity: num,

        // variations
        product_size: hasSizes ? selectedSize : null,
        product_color: hasColors ? selectedColor : null,

        // ✅ unique key so backend can store separate rows
        row_key: rowKey,

        // product metadata
        product_category: foundData?.collection ?? null,
        product_style: foundData?.style ?? null,

        // media
        image_url: mainImageUrl,

        // optional extra info
        description: foundData?.shortDescription ?? null,
      };

      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || "Failed to add to cart");
      }

      // ✅ update header/badge from backend truth
      await refreshCart?.();

      // ✅ Get updated cart count after refresh
      const cartRes = await fetch(`/api/cart?user_id=${userId}`, {
        cache: "no-store",
      });
      if (cartRes.ok) {
        const cartData = await cartRes.json();
        const cartItems = Array.isArray(cartData) ? cartData : [];
        const totalQty = cartItems.reduce((acc: number, item: any) => {
          return acc + (item.product_quantity ?? 1);
        }, 0);

        toast.success(`Added to cart! Total items: ${totalQty}`, {
          autoClose: 3000,
          position: "top-center",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        toast.success("Product added to cart!", {
          autoClose: 3000,
          position: "top-center",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to add product to cart!",
        { autoClose: 3000, position: "top-center" },
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!foundData) return null;

  const accordionSections = [
    {
      title: "Details & Fabric",
      body:
        foundData.shortDescription ||
        foundData.description ||
        "No description available.",
    },
    {
      title: "Shipping & Returns",
      body: "Free shipping on orders over Rs. 15,000. Free returns within 7 days, unworn with tags attached.",
    },
    {
      title: "Size & Fit",
      body: "True to size, tailored fit. For a relaxed fit, consider sizing up.",
    },
  ];

  return (
    <div className="px-3 sm:px-4">
      <div key={foundData._id} className="w-full max-w-screen-2xl mx-auto">
        {/* Breadcrumb */}
        <div className="text-xs text-ink/50 mb-5">
          <Link href="/" className="hover:text-olive transition-colors">
            Home
          </Link>{" "}
          /{" "}
          <Link
            href="/all-products"
            className="hover:text-olive transition-colors"
          >
            Shop
          </Link>{" "}
          / <span className="text-ink">{foundData.title}</span>
        </div>

        {/* First Row */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-16 items-start">
          {/* Thumbnails */}
          <div className="flex lg:flex-col order-2 lg:order-1 gap-2.5 overflow-x-auto lg:overflow-y-auto lg:w-[76px] lg:max-h-[550px]">
            {allProductImages?.map((_imageObj: any, index: number) => (
              _imageObj?.url && _imageObj.url.trim() !== "" && (
                <motion.button
                  key={_imageObj?.url || index}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedImageIndex(index)}
                  className="flex-shrink-0"
                >
                  <Image
                    src={_imageObj.url}
                    alt={_imageObj.alt || foundData.title || "Product image"}
                    width={76}
                    height={95}
                    className={`transition-all w-[62px] h-[78px] lg:w-[76px] lg:h-[95px] object-cover border-2 ${
                      selectedImageIndex === index
                        ? "border-ink"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  />
                </motion.button>
              )
            ))}
          </div>

          {/* Main Image */}
          <div className="order-1 lg:order-2 w-full lg:flex-1">
            {allProductImages[selectedImageIndex]?.url ? (
              <div className="relative aspect-[4/5] w-full bg-tint-1 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={allProductImages[selectedImageIndex].url}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={allProductImages[selectedImageIndex].url}
                      fill
                      className="object-cover"
                      alt={foundData.title}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            ) : (
              <div className="aspect-[4/5] w-full bg-tint-1 flex items-center justify-center">
                <span className="font-serif italic text-[120px] text-black/[0.08]">
                  {(foundData.title || "M").charAt(0)}
                </span>
              </div>
            )}
          </div>

          {/* Details */}
          <Reveal direction="right" className="order-3 w-full lg:flex-1 mt-2 lg:mt-0">
            {foundData?.collection && (
              <div className="text-xs tracking-[0.1em] uppercase text-olive-light mb-2.5">
                {foundData.collection}
              </div>
            )}

            <h1 className="font-serif text-2xl sm:text-3xl lg:text-[34px] leading-tight text-ink mb-3.5">
              {foundData.title}
            </h1>

            <div className="flex items-center gap-2.5 mb-5">
              <span className="text-xl text-olive">Rs. {finalPrice}</span>
            </div>

            {foundData?.shortDescription && (
              <p className="text-sm leading-relaxed text-ink/60 max-w-[440px] mb-7">
                {foundData.shortDescription}
              </p>
            )}

            {/* ✅ COLOR SELECTOR */}
            {hasColors && (
              <div className="mb-6">
                <div className="text-xs uppercase tracking-[0.06em] text-ink mb-3">
                  Color:{" "}
                  <span className="text-ink/50 normal-case">
                    {selectedColor ? titleCase(selectedColor) : ""}
                  </span>
                </div>
                <div className="flex gap-2.5 flex-wrap">
                  {colorsFromVariants.map((color) => {
                    const normalizedColor = color.toLowerCase().replace(/\s+/g, " ");
                    return (
                      <motion.button
                        key={color}
                        whileHover={{ scale: 1.12 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setSelectedColor(color)}
                        title={titleCase(color)}
                        className={`w-7 h-7 rounded-full ${colorClass[normalizedColor] ?? "bg-hairline"} border-2 transition-colors ${
                          selectedColor === color ? "border-ink" : "border-transparent"
                        }`}
                        style={{ boxShadow: "0 0 0 1px #ded7c6" }}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {/* ✅ SIZE SELECTOR */}
            {hasSizes && (
              <div className="mb-2">
                <div className="text-xs uppercase tracking-[0.06em] text-ink mb-3">
                  Size:{" "}
                  <span className="text-ink/50 normal-case">
                    {selectedSize || "Select"}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sizesFromVariants.map((size) => (
                    <motion.button
                      key={size}
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.94 }}
                      onClick={() => setSelectedSize(size)}
                      className={`w-11 h-11 border text-[13px] flex items-center justify-center transition-all ${
                        selectedSize === size
                          ? "bg-ink text-white border-ink"
                          : "border-hairline text-ink hover:border-ink"
                      }`}
                    >
                      {size.toUpperCase()}
                    </motion.button>
                  ))}
                </div>
                {!selectedSize && (
                  <div className="text-xs text-brick mt-2.5">
                    Please select a size before adding to bag.
                  </div>
                )}
              </div>
            )}

            {/* Quantity + Add to cart */}
            <div className="flex items-center gap-3.5 mt-7 mb-2 flex-wrap">
              <div className="flex items-center border border-ink">
                <button
                  type="button"
                  className="w-11 h-[52px] flex items-center justify-center text-base disabled:opacity-40"
                  onClick={() => setNum((n) => (n <= 1 ? 1 : n - 1))}
                  disabled={num <= 1}
                >
                  −
                </button>
                <span className="w-10 text-center text-sm">{num}</span>
                <button
                  type="button"
                  className="w-11 h-[52px] flex items-center justify-center text-base disabled:opacity-40"
                  onClick={() => {
                    if (availableStock !== null && num >= availableStock) {
                      toast.warning(`Only ${availableStock} items available!`, {
                        autoClose: 2000,
                        position: "top-center",
                      });
                      return;
                    }
                    setNum((n) => n + 1);
                  }}
                  disabled={availableStock !== null && num >= availableStock}
                >
                  +
                </button>
              </div>

              <motion.div
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.97 }}
                className="flex-1 sm:flex-none"
              >
                <Button
                  onClick={handleAddToCart}
                  disabled={
                    isLoading || (availableStock !== null && availableStock === 0)
                  }
                  className="w-full gap-x-2 h-[52px] px-8"
                >
                  <motion.span
                    animate={isLoading ? { rotate: 360 } : { rotate: 0 }}
                    transition={
                      isLoading
                        ? { duration: 0.8, repeat: Infinity, ease: "linear" }
                        : { duration: 0.2 }
                    }
                    className="inline-flex"
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </motion.span>
                  {isLoading
                    ? "Adding..."
                    : availableStock === 0
                      ? "Out of Stock"
                      : "Add to Bag"}
                </Button>
              </motion.div>

              <motion.button
                type="button"
                whileTap={{ scale: 0.85 }}
                onClick={() => setWishlisted((w) => !w)}
                aria-label="Toggle wishlist"
                className="w-[52px] h-[52px] border border-ink flex items-center justify-center flex-shrink-0"
              >
                <motion.span
                  key={wishlisted ? "on" : "off"}
                  initial={{ scale: 0.6 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  className="inline-flex"
                >
                  <Heart
                    className="h-[18px] w-[18px]"
                    fill={wishlisted ? "#9c3f34" : "none"}
                    stroke={wishlisted ? "#9c3f34" : "#1C1C1A"}
                    strokeWidth={1.6}
                  />
                </motion.span>
              </motion.button>
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Button
                type="button"
                variant="outline"
                onClick={() => setTryOnOpen(true)}
                className="mt-4 w-full sm:w-auto gap-x-2 h-[52px] px-8 border-brick text-brick hover:bg-brick hover:text-cream hover:border-brick"
              >
                <motion.span
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  className="inline-flex"
                >
                  <Sparkles className="h-4 w-4" />
                </motion.span>
                Try It On Virtually
              </Button>
            </motion.div>

            <ToastContainer />

            <VirtualTryOnModal
              open={tryOnOpen}
              onOpenChange={setTryOnOpen}
              garmentUrl={
                allProductImages[selectedImageIndex]?.url ||
                productImages[0]?.url ||
                ""
              }
              productTitle={foundData?.title}
            />

            {/* Accordion */}
            <div className="border-t border-hairline mt-8 pt-2">
              {accordionSections.map((sec, i) => (
                <div key={sec.title} className="border-b border-hairline">
                  <button
                    onClick={() =>
                      setAccordionOpen((prev) => (prev === i ? -1 : i))
                    }
                    className="w-full py-4 flex justify-between items-center text-left"
                  >
                    <span className="text-[13px] tracking-[0.04em] text-ink">
                      {sec.title}
                    </span>
                    <motion.span
                      animate={{ rotate: accordionOpen === i ? 45 : 0 }}
                      transition={{ duration: 0.25, ease: EASE }}
                      className="text-lg text-olive"
                    >
                      +
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                  {accordionOpen === i && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="overflow-hidden"
                    >
                    <div className="pb-4 text-[13px] text-ink/60 leading-relaxed prose prose-sm max-w-none">
                      {i === 0 && foundData.details?.length ? (
                        foundData.details.map((detail: any, idx: number) => (
                          <div key={idx} className="mb-3">
                            <span className="font-medium text-ink uppercase text-xs tracking-[0.04em]">
                              {detail.key}:{" "}
                            </span>
                            <span
                              dangerouslySetInnerHTML={{
                                __html: detail.valueHtml,
                              }}
                            />
                          </div>
                        ))
                      ) : (
                        <span>{sec.body}</span>
                      )}
                    </div>
                    </motion.div>
                  )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Related products */}
        {relatedProducts && relatedProducts.length > 0 && (
          <Reveal direction="up" className="mt-16 lg:mt-24">
            <h2 className="font-serif text-2xl text-ink mb-7">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard
                  key={p._id}
                  item={p}
                  linkTo={`/product/${p.slug}`}
                />
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
