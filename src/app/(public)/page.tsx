import Hero from "@/views/Hero";
import ShopByCollection from "@/views/ShopByCollection";
import Collections from "@/views/Collections";
import USPStrip from "@/views/USPStrip";
import FeaturedProducts from "@/views/FeaturedProducts";
import WhyMahila from "@/views/WhyMahila";
import EditorialBanner from "@/views/EditorialBanner";
import CountdownBanner from "@/views/CountdownBanner";
import FAQ from "@/views/FAQ";
import Newsletter from "@/views/Newsletter";
import { getDatabase } from "@/lib/mongodb";

type CollectionItem = {
  _id?: string;
  name: string;
  slug: string;
  image?: string | null;
};

type ProductItem = {
  _id?: string;
  title?: string;
  slug?: string;
  description?: string;
  shortDescription?: string;
  basePrice?: number;
  productCode?: string;
  collection?: string;
  collectionSlug?: string;
  style?: string;
  styleSlug?: string;
  tags?: string[];
  details?: Array<{ key: string; valueHtml: string }>;
  purchasePrice?: number;
  variants?: Array<{ images?: Array<{ url?: string }> }>;
  images?: Array<{ url?: string }>;
  createdAt?: string;
  updatedAt?: string;
};

const serializeProducts = (products: any[]): ProductItem[] =>
  products.map((product) => ({
    _id: product._id?.toString(),
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
    tags: product.tags,
    details: product.details,
    purchasePrice: product.purchasePrice,
    variants: product.variants,
    images: product.images,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  }));

const serializeCollections = (collections: any[]): CollectionItem[] =>
  collections.map((collection) => ({
    _id: collection._id?.toString(),
    name: collection.name,
    slug: collection.slug ?? "",
  }));

const getCollections = async () => {
  const db = await getDatabase();
  const collections = await db
    .collection("inventory_collections")
    .find({})
    .sort({ name: 1 })
    .toArray();
  return serializeCollections(collections);
};

const getFirstProductImage = (product: ProductItem): string | null => {
  const direct = product.images?.find((img) => img?.url)?.url;
  if (direct) return direct;
  const variantImage = product.variants
    ?.flatMap((variant) => variant.images || [])
    .find((img) => img?.url)?.url;
  return variantImage || null;
};

const withCollectionImages = (
  collections: CollectionItem[],
  products: ProductItem[],
): CollectionItem[] =>
  collections.map((collection) => {
    const match = products.find((product) => {
      const bySlug =
        product.collectionSlug &&
        product.collectionSlug.toLowerCase() === collection.slug.toLowerCase();
      const byName =
        product.collection &&
        product.collection.toLowerCase() === collection.name.toLowerCase();
      return bySlug || byName;
    });
    return {
      ...collection,
      image: match ? getFirstProductImage(match) : null,
    };
  });

const getAllProducts = async () => {
  const db = await getDatabase();
  const products = await db
    .collection("inventory_products")
    .find({
      $or: [{ displayOnWebsite: { $exists: false } }, { displayOnWebsite: true }],
    })
    .sort({ createdAt: -1 })
    .toArray();
  return serializeProducts(products);
};

export default async function Home() {
  const [collections, products] = await Promise.all([
    getCollections(),
    getAllProducts(),
  ]);

  const collectionsWithImages = withCollectionImages(collections, products);

  return (
    <section>
      <Hero></Hero>
      <Collections initialCollections={collectionsWithImages} />
      <FeaturedProducts products={products} />
      <USPStrip />
      <WhyMahila />
      <EditorialBanner />
      <CountdownBanner />
      {/* <SufiCollection /> */}
      {/* <VideoTextSection></VideoTextSection> */}
      {/* <DifferentFromOthers></DifferentFromOthers> */}
      <FAQ />
      <Newsletter />
    </section>
  );
}
