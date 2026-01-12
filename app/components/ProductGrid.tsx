"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Product } from "@/lib/api";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("favorites");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  if (!mounted) return null;

  const categories = [
    "all",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((f) => f !== id)
        : [...prev, id];

      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    });
  };

  const filtered = products.filter((p) => {
    const matchSearch = p.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      category === "all" || p.category === category;

    const matchFavorite =
      !showFavoritesOnly || favorites.includes(p.id);

    return matchSearch && matchCategory && matchFavorite;
  });

  return (
    <>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search products"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-3 border rounded-lg"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-3 border rounded-lg bg-white"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c === "all" ? "All Categories" : c.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      <label className="flex items-center gap-2 mb-6 text-sm">
        <input
          type="checkbox"
          checked={showFavoritesOnly}
          onChange={(e) =>
            setShowFavoritesOnly(e.target.checked)
          }
        />
        Show favorites only
      </label>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="relative bg-white rounded-lg shadow hover:shadow-lg p-4"
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleFavorite(product.id);
              }}
              className="absolute top-2 right-2 text-xl"
            >
              {favorites.includes(product.id) ? "❤️" : "🤍"}
            </button>

            <img
              src={product.image}
              alt={product.title}
              className="h-48 w-full object-contain bg-gray-50 mb-4"
            />

            <h2 className="font-semibold text-sm line-clamp-2">
              {product.title}
            </h2>

            <p className="mt-2 font-medium">
              ₹ {product.price.toFixed(2)}
            </p>

            <span className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full mt-2 inline-block">
              {product.category}
            </span>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center mt-10 text-gray-500">
          No products found.
        </p>
      )}
    </>
  );
}
