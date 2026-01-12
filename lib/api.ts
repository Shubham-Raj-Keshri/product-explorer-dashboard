import { headers } from "next/headers";

export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

/**
 * Helper to build absolute base URL
 * Works on localhost (3000 / 3001) and Vercel
 */
function getBaseUrl() {
  const headersList = headers();
  const host = headersList.get("host");

  // Fallback safety (should not usually be needed)
  if (!host) {
    return "http://localhost:3000";
  }

  return host.includes("localhost")
    ? `http://${host}`
    : `https://${host}`;
}

/* Fetch all products */
export async function getProducts(): Promise<Product[]> {
  try {
    const baseUrl = getBaseUrl();

    const res = await fetch(`${baseUrl}/api/products`, {
      cache: "no-store",
    });

    if (!res.ok) return [];

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("getProducts error:", error);
    return [];
  }
}

/* Fetch single product */
export async function getProductById(
  id: string
): Promise<Product | null> {
  try {
    const baseUrl = getBaseUrl();

    const res = await fetch(
      `${baseUrl}/api/products/${id}`,
      { cache: "no-store" }
    );

    if (!res.ok) return null;

    const data = await res.json();
    return data && data.id ? data : null;
  } catch (error) {
    console.error("getProductById error:", error);
    return null;
  }
}
