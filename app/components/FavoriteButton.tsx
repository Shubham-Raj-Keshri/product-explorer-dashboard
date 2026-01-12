"use client";

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
}

export default function FavoriteButton({
  isFavorite,
  onToggle,
}: FavoriteButtonProps) {
  return (
    <button
      onClick={onToggle}
      className="text-xl"
      aria-label="Toggle favorite"
    >
      {isFavorite ? "❤️" : "🤍"}
    </button>
  );
}
