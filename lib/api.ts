export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

/* Fetch all products (SAFE – never throws) */
export async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch("https://fakestoreapi.com/products", {
      cache: "no-store",
    });

    if (!res.ok) {
      return [];
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

/* Fetch single product (SAFE) */
export async function getProductById(
  id: string
): Promise<Product | null> {
  try {
    const res = await fetch(
      `https://fakestoreapi.com/products/${id}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data && data.id ? data : null;
  } catch {
    return null;
  }
}
