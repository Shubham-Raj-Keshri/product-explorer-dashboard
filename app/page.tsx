export const dynamic = "force-dynamic";

import { getProducts } from "@/lib/api";
import ProductGrid from "./components/ProductGrid";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">🛒 Product Explorer</h1>
      <p className="text-gray-500 mb-6">
        Browse and explore products
      </p>

      <ProductGrid products={products} />
    </main>
  );
}
