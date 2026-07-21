"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Search, Menu, User, X } from "lucide-react";
import Wrapper from "../shared/Wrapper";
import CartButton from "../CartButton";
import { Input } from "@/components/ui/input";
import AnnouncementBar from "./AnnouncementBar";

interface NavItem {
  label: string;
  href: string;
}

const Header = () => {
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [styles, setStyles] = useState<NavItem[]>([]);
  const [collections, setCollections] = useState<NavItem[]>([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavigate = (href: string) => {
    setIsSheetOpen(false);
    setTimeout(() => {
      router.push(href);
    }, 100);
  };

  const getProductImage = (product: any) => {
    const img = product?.images?.[0];
    if (typeof img === "string") return img;
    if (img?.url) return img.url;
    const variantImg = product?.variants?.[0]?.images?.[0];
    if (typeof variantImg === "string") return variantImg;
    if (variantImg?.url) return variantImg.url;
    if (variantImg?.asset?.url) return variantImg.asset.url;
    return "/products/placeholder.jpg";
  };

  // Fetch collections and styles from MongoDB
  useEffect(() => {
    const fetchNavItems = async () => {
      try {
        const [collectionsRes, stylesRes] = await Promise.all([
          fetch("/api/public/collections"),
          fetch("/api/public/styles"),
        ]);

        const collectionsData = await collectionsRes.json();
        const stylesData = await stylesRes.json();

        // Set styles
        if (stylesData.ok && stylesData.styles) {
          const styleItems = stylesData.styles.map((style: any) => ({
            label: style.name,
            href: `/collection/${style.slug}`,
          }));
          setStyles(styleItems);
        }

        // Set collections
        if (collectionsData.ok && collectionsData.collections) {
          const collectionItems = collectionsData.collections.map(
            (collection: any) => ({
              label: collection.name,
              href: `/collection/${collection.slug}`,
            }),
          );
          setCollections(collectionItems);
        }
      } catch (error) {
        console.error("Error fetching nav items:", error);
      }
    };

    fetchNavItems();
  }, []);

  // Fetch products on mount (MongoDB public API)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/public/products", { cache: "no-store" });
        if (!res.ok) {
          throw new Error(`Failed to load products: ${res.status}`);
        }
        const data = await res.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts([]);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = products.filter((product) => {
        const title = (product.title || "").toLowerCase();
        const collection = (product.collection || "").toLowerCase();
        const styleValue = product.style;
        const style = Array.isArray(styleValue)
          ? styleValue.join(" ").toLowerCase()
          : (styleValue || "").toString().toLowerCase();
        return title.includes(query) || collection.includes(query) || style.includes(query);
      });
      setFilteredProducts(filtered);
    }
  }, [searchQuery, products]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".search-container")) {
        setShowSearch(false);
      }
    };

    if (showSearch) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showSearch]);

  const desktopNavItems: NavItem[] = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/all-products" },
    ...collections.slice(0, 2),
    { label: "AI Try-On", href: "/virtual-try-on" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <AnnouncementBar />
      <header
        className={`sticky top-0 z-50 bg-cream border-b border-hairline isolate transition-shadow duration-300 ${
          scrolled ? "shadow-md" : "shadow-sm"
        }`}
        style={{ backgroundColor: "#F7F3EC" }}
      >
        <Wrapper>
          <div
            className={`flex items-center justify-between gap-4 transition-[padding] duration-300 ${
              scrolled ? "py-2 lg:py-2.5" : "py-3 lg:py-3.5"
            }`}
          >
            {/* LEFT: Hamburger + Logo */}
            <div className="flex items-center gap-3">
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger
                  aria-label="Open menu"
                  className="p-2 lg:hidden"
                >
                  <motion.span
                    animate={{ rotate: isSheetOpen ? 90 : 0 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="block"
                  >
                    {isSheetOpen ? (
                      <X className="h-6 w-6 text-ink" />
                    ) : (
                      <Menu className="h-6 w-6 text-ink" />
                    )}
                  </motion.span>
                </SheetTrigger>

                <SheetContent side="left" className="bg-cream overflow-y-auto">
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  <SheetDescription className="sr-only">
                    Browse our collections and styles
                  </SheetDescription>
                  <div className="flex items-center gap-2 mt-2">
                    <img
                      src="/mahila-logo.png"
                      alt="Mahila"
                      className="h-20 w-auto object-contain"
                    />
                  </div>

                  <motion.nav
                    className="mt-8 space-y-6"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      visible: { transition: { staggerChildren: 0.05 } },
                    }}
                  >
                    {desktopNavItems.map((item) => (
                      <motion.button
                        key={item.href}
                        variants={{
                          hidden: { opacity: 0, x: -16 },
                          visible: { opacity: 1, x: 0 },
                        }}
                        onClick={() => handleNavigate(item.href)}
                        className="block w-full text-left text-sm font-medium uppercase tracking-wider text-ink hover:text-olive hover:translate-x-1 transition"
                      >
                        {item.label}
                      </motion.button>
                    ))}

                    {collections.length > 0 && (
                      <motion.div
                        variants={{
                          hidden: { opacity: 0 },
                          visible: { opacity: 1 },
                        }}
                        className="pt-4 border-t border-hairline"
                      >
                        <h3 className="text-xs font-medium uppercase tracking-wider text-ink/60 mb-3">
                          Collections
                        </h3>
                        <ul className="flex flex-col gap-2">
                          {collections.map((item) => (
                            <li key={item.href}>
                              <button
                                onClick={() => handleNavigate(item.href)}
                                className="block py-1.5 text-base text-ink/80 hover:text-olive hover:translate-x-1 transition-all w-full text-left"
                              >
                                {item.label}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </motion.nav>
                </SheetContent>
              </Sheet>

              <Link href="/" className="flex items-center">
                <motion.img
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  src="/mahila-logo.png"
                  alt="Mahila"
                  className="h-12 lg:h-[52px] w-auto object-contain"
                />
              </Link>
            </div>

            {/* CENTER: Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8 text-sm tracking-[0.03em] flex-shrink-0">
              {desktopNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative text-ink/80 hover:text-olive transition-colors pb-[3px]"
                >
                  {item.label}
                  <span className="absolute left-0 -bottom-0.5 h-px w-full origin-left scale-x-0 bg-olive transition-transform duration-300 ease-out group-hover:scale-x-100" />
                </Link>
              ))}
            </nav>

            {/* RIGHT: Search + Account + Cart */}
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              <div className="search-container relative flex items-center">
                <div
                  className={`flex items-center transition-all duration-300 ${
                    showSearch ? "w-48 sm:w-64" : "w-0"
                  } overflow-hidden bg-white`}
                >
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full border border-hairline rounded-none py-2 px-3 text-sm focus:outline-none focus:border-olive bg-white h-9"
                    style={{ visibility: showSearch ? "visible" : "hidden" }}
                    autoFocus={showSearch}
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => {
                    if (showSearch) {
                      setShowSearch(false);
                      setSearchQuery("");
                    } else {
                      setShowSearch(true);
                    }
                  }}
                  aria-label="Search"
                  className="p-2 rounded-full hover:bg-ink/5 transition flex-shrink-0 z-10"
                >
                  <Search className="h-[18px] w-[18px] text-ink" strokeWidth={1.6} />
                </motion.button>

                {/* Search Dropdown Results */}
                <AnimatePresence>
                  {showSearch && searchQuery.trim() !== "" && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.98 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute top-12 right-0 sm:left-0 w-80 max-w-[85vw] bg-white border border-hairline shadow-lg z-50 p-4"
                    >
                      {filteredProducts.length === 0 ? (
                        <p className="text-sm text-ink/50 py-4">
                          No products found
                        </p>
                      ) : (
                        <div className="space-y-2">
                          {filteredProducts.slice(0, 5).map((product, i) => (
                            <motion.div
                              key={product._id}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.2, delay: i * 0.04 }}
                            >
                              <Link
                                href={`/product/${product.slug}`}
                                onClick={() => {
                                  setShowSearch(false);
                                  setSearchQuery("");
                                }}
                                className="flex gap-3 p-2 hover:bg-cream rounded cursor-pointer transition"
                              >
                                <Image
                                  src={getProductImage(product)}
                                  alt={product.title}
                                  width={50}
                                  height={50}
                                  className="object-cover"
                                />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium truncate text-ink">
                                    {product.title}
                                  </p>
                                  <p className="text-xs text-olive">
                                    Rs. {Number(product.basePrice || 0)}
                                  </p>
                                </div>
                              </Link>
                            </motion.div>
                          ))}
                          {filteredProducts.length > 5 && (
                            <p className="text-xs text-ink/50 py-2 text-center">
                              +{filteredProducts.length - 5} more results
                            </p>
                          )}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <span
                title="Account"
                className="hidden sm:flex p-2 rounded-full hover:bg-ink/5 transition cursor-pointer"
              >
                <User className="h-[18px] w-[18px] text-ink" strokeWidth={1.6} />
              </span>

              <div className="relative flex justify-center items-center text-ink">
                <CartButton />
              </div>
            </div>
          </div>
        </Wrapper>
      </header>
    </>
  );
};

export default Header;
