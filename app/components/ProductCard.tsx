"use client";

import Link from "next/link";
import { Product } from "@/lib/api";
import FavoriteButton from "./FavoriteButton";

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function ProductCard({
  product,
  isFavorite,
  onToggleFavorite,
}: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="relative bg-white rounded-lg shadow hover:shadow-lg transition p-4"
    >
      <div
        className="absolute top-2 right-2"
        onClick={(e) => {
          e.preventDefault();
          onToggleFavorite();
        }}
      >
        <FavoriteButton
          isFavorite={isFavorite}
          onToggle={onToggleFavorite}
        />
      </div>

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
}
