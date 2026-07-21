"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProductCart from "@/components/ProductCart";
import FiltersTopBar from "@/components/FiltersSidebar";
import { EASE } from "@/components/motion/variants";

export default function AllProductsClient({
  products,
  showFilters = true,
  enableCollectionFilter = false,
}: {
  products: any[];
  showFilters?: boolean;
  enableCollectionFilter?: boolean;
}) {
  const [price, setPrice] = useState<[number, number | null]>([0, null]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [selectedCollections, setSelectedCollections] = useState<string[]>(
    [],
  );

  const productCollectionSlug = (p: any) =>
    p.collectionSlug || p.collection?.toLowerCase().replace(/\s+/g, "-");

  const collectionOptions = useMemo(() => {
    if (!enableCollectionFilter) return [];
    const map = new Map<string, string>();
    products.forEach((p) => {
      if (!p.collection) return;
      const slug = productCollectionSlug(p);
      if (slug && !map.has(slug)) map.set(slug, p.collection);
    });
    return Array.from(map.entries()).map(([slug, name]) => ({ slug, name }));
  }, [products, enableCollectionFilter]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Extract variants data
      const variants = p.variants || [];

      // Get all sizes from all variants (lowercase for comparison)
      const productSizes = variants
        .flatMap((v: any) =>
          (v.sizes || []).map((s: any) => s.size?.toLowerCase()),
        )
        .filter(Boolean);

      const matchPrice =
        price[1] === null ||
        (p.basePrice >= price[0] && p.basePrice <= price[1]);

      const matchSize =
        sizes.length === 0 ||
        sizes.some((s) => productSizes.includes(s.toLowerCase()));

      const matchCollection =
        selectedCollections.length === 0 ||
        selectedCollections.includes(productCollectionSlug(p));

      return matchPrice && matchSize && matchCollection;
    });
  }, [products, price, sizes, selectedCollections]);

  const filterKey = `${price[1]}-${sizes.join(",")}-${selectedCollections.join(",")}`;

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-11">
      {showFilters ? (
        <FiltersTopBar
          price={price}
          setPrice={setPrice}
          sizes={sizes}
          setSizes={setSizes}
          collections={collectionOptions}
          selectedCollections={selectedCollections}
          setSelectedCollections={setSelectedCollections}
          total={filteredProducts.length}
        />
      ) : null}

      <div className="flex-1 w-full min-w-0">
        {showFilters && (
          <p className="hidden lg:block text-[13px] text-ink/60 mb-7">
            {filteredProducts.length} products
          </p>
        )}

        {/* Display all products in a single grid */}
        <AnimatePresence mode="wait">
          {filteredProducts.length > 0 ? (
            <motion.div
              key={filterKey}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
            >
              {filteredProducts.map((product, i) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    ease: EASE,
                    delay: Math.min(i, 12) * 0.04,
                  }}
                >
                  <ProductCart
                    item={product}
                    linkTo={`/product/${product.slug}`}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-10 sm:py-16 lg:py-20"
            >
              <p className="text-sm sm:text-base lg:text-lg text-ink/50">
                No products match your filters.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
