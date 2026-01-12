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
 * Build absolute base URL safely
 * Works on localhost + Vercel
 */
function getBaseUrl() {
  const headersList = headers();
  const host = headersList.get("host");

  if (!host) {
    return "http://localhost:3000";
  }

  const protocol = host.includes("localhost") ? "http" : "https";
  return `${protocol}://${host}`;
}

/* Fetch all products */
export async function getProducts(): Promise<Product[]> {
  try {
    const baseUrl = getBaseUrl();

    const res = await fetch(`${baseUrl}/api/products`, {
      cache: "no-store",
    });

    if (!res.ok) return [];
    return await res.json();
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

    const res = await fetch(`${baseUrl}/api/products/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("getProductById error:", error);
    return null;
  }
}
