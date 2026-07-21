// app/all-products/page.tsx
import AllProductsClient from "@/components/AllProductsClient";
import Wrapper from "@/components/shared/Wrapper";
import Reveal from "@/components/motion/Reveal";
import { getDatabase } from "@/lib/mongodb";

async function getAllProducts() {
  try {
    const db = await getDatabase();
    const products = await db
      .collection("inventory_products")
      .find({
        $or: [{ displayOnWebsite: { $exists: false } }, { displayOnWebsite: true }],
      })
      .sort({ createdAt: -1 })
      .toArray();

    // Serialize the products for client-side use
    const serialized = products.map((product) => ({
      _id: product._id?.toString(),
      id: product._id?.toString(),
      title: product.title,
      slug: product.slug,
      description: product.description,
      shortDescription: product.shortDescription,
      basePrice: product.basePrice,
      productCode: product.productCode,
      collection: product.collection,
      collectionSlug: product.collectionSlug,
      style: product.style,
      styleSlug: product.styleSlug,
      styleName: product.style, // Add styleName for grouping
      tags: product.tags,
      details: product.details,
      purchasePrice: product.purchasePrice,
      variants: product.variants,
      images: product.images,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }));

    return serialized;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function Page() {
  const productData = await getAllProducts();

  return (
    <>
      <Reveal direction="up" className="bg-tint-1 py-9 px-4 text-center">
        <div className="text-xs tracking-[0.1em] uppercase text-olive-light mb-2">
          Shop All
        </div>
        <h1 className="font-serif text-[32px] text-ink">
          Womenswear Collection
        </h1>
      </Reveal>
      <Wrapper>
        <section className="py-10 lg:py-14">
          <AllProductsClient products={productData} enableCollectionFilter />
        </section>
      </Wrapper>
    </>
  );
}