import { getDatabase } from "@/lib/mongodb";

type SlugDoc = {
  slug?: string;
};

export const getProductBySlug = async (slug: string) => {
  if (!slug) return null;
  const db = await getDatabase();
  return db.collection("inventory_products").findOne({
    slug,
    $or: [{ displayOnWebsite: { $exists: false } }, { displayOnWebsite: true }],
  });
};

export const getCollectionBySlug = async (slug: string) => {
  if (!slug) return null;
  const db = await getDatabase();
  return db.collection("inventory_collections").findOne({ slug });
};

export const getAllProductSlugs = async () => {
  const db = await getDatabase();
  const results = await db
    .collection<SlugDoc>("inventory_products")
    .find(
      {
        slug: { $type: "string" },
        $or: [{ displayOnWebsite: { $exists: false } }, { displayOnWebsite: true }],
      },
      { projection: { slug: 1, _id: 0 } }
    )
    .toArray();

  return results
    .map((item: { slug?: string }) => item.slug)
    .filter((slug: string | undefined): slug is string => Boolean(slug));
};

export const getRelatedProducts = async (
  collectionSlug: string | undefined,
  excludeSlug: string,
  limit = 4
) => {
  const db = await getDatabase();
  const query: Record<string, unknown> = {
    slug: { $ne: excludeSlug },
    $or: [{ displayOnWebsite: { $exists: false } }, { displayOnWebsite: true }],
  };
  if (collectionSlug) {
    query.collectionSlug = collectionSlug;
  }
  const products = await db
    .collection("inventory_products")
    .find(query)
    .sort({ createdAt: -1 })
    .limit(limit)
    .toArray();
  return products.map((p: any) => ({
    _id: p._id?.toString(),
    title: p.title,
    slug: p.slug,
    basePrice: p.basePrice,
    style: p.style,
    tags: p.tags,
    variants: p.variants,
    images: p.images,
  }));
};

export const getAllCollectionSlugs = async () => {
  const db = await getDatabase();
  const results = await db
    .collection<SlugDoc>("inventory_collections")
    .find({ slug: { $type: "string" } }, { projection: { slug: 1, _id: 0 } })
    .toArray();

  return results
    .map((item: { slug?: string }) => item.slug)
    .filter((slug: string | undefined): slug is string => Boolean(slug));
};
