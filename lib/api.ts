export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

/* Fetch all products */
export async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch("/api/products", {
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
    const res = await fetch(`/api/products/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("getProductById error:", error);
    return null;
  }
}
