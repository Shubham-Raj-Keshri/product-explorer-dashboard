"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Product } from "@/lib/api";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Load favorites from localStorage on first render
  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  // Categories derived from product data
  const categories = [
    "all",
    ...Array.from(new Set(products.map((item) => item.category))),
  ];

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((favId) => favId !== id)
        : [...prev, id];

      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    });
  };

  // Client-side filtering keeps interactions fast
  const visibleProducts = products.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      item.category === selectedCategory;

    const matchesFavorite =
      !showFavoritesOnly || favorites.includes(item.id);

    return matchesSearch && matchesCategory && matchesFavorite;
  });

  return (
    <>
      {/* Controls */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search by product name"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-3 border rounded-lg bg-white"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "all" ? "All Categories" : cat.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={showFavoritesOnly}
            onChange={(e) => setShowFavoritesOnly(e.target.checked)}
          />
          Show favorites only
        </label>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {visibleProducts.map((product) => {
          const isFavorite = favorites.includes(product.id);

          return (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="relative bg-white rounded-lg shadow hover:shadow-lg transition p-4 cursor-pointer"
            >
              {/* Favorite button */}
              <button
                onClick={(e) => {
                  e.preventDefault(); // prevent navigation
                  toggleFavorite(product.id);
                }}
                className="absolute top-2 right-2 text-xl"
                aria-label="Toggle favorite"
              >
                {isFavorite ? "❤️" : "🤍"}
              </button>

              <img
                src={product.image}
                alt={product.title}
                className="h-48 w-full object-contain bg-gray-50 rounded mb-4"
              />

              <h2 className="font-semibold text-sm line-clamp-2">
                {product.title}
              </h2>

              <p className="text-gray-700 mt-2">
                ₹ {product.price.toFixed(2)}
              </p>

              <span className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full mt-2 inline-block">
                {product.category}
              </span>
            </Link>
          );
        })}
      </div>

      {visibleProducts.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No matching products found
        </p>
      )}
    </>
  );
}
