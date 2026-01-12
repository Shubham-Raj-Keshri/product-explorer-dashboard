export const dynamic = "force-dynamic";

import { getProducts } from "@/lib/api";
import ProductGrid from "./components/ProductGrid";

export default async function HomePage() {
  let products = [];

  try {
    products = await getProducts();
  } catch (error) {
    console.error(error);
  }

  if (!products || products.length === 0) {
    return (
      <main className="p-6 max-w-7xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">
          🛒 Product Explorer
        </h1>
        <p className="text-gray-500">
          Unable to load products right now.
        </p>
      </main>
    );
  }

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">
        🛒 Product Explorer
      </h1>
      <p className="text-gray-500 mb-6">
        Browse and explore products
      </p>

      <ProductGrid products={products} />
    </main>
  );
}
