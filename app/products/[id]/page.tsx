export const dynamic = "force-dynamic";

import { getProductById } from "@/lib/api";
import Link from "next/link";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProductById(params.id);

  if (!product) {
    return (
      <main className="p-6 max-w-4xl mx-auto text-center">
        <p className="text-gray-500 mb-4">
          Product not found.
        </p>
        <Link href="/" className="text-blue-600">
          ← Back to products
        </Link>
      </main>
    );
  }

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <Link href="/" className="text-blue-600 mb-6 inline-block">
        ← Back to products
      </Link>

      <div className="bg-white rounded-lg shadow p-6 grid md:grid-cols-2 gap-6">
        <img
          src={product.image}
          alt={product.title}
          className="h-80 w-full object-contain"
        />

        <div>
          <h1 className="text-2xl font-bold mb-4">
            {product.title}
          </h1>
          <p className="text-gray-600 mb-4">
            {product.description}
          </p>
          <p className="text-xl font-semibold mb-4">
            ₹ {product.price.toFixed(2)}
          </p>
          <span className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
            {product.category}
          </span>
        </div>
      </div>
    </main>
  );
}
