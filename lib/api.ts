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
  const res = await fetch("https://fakestoreapi.com/products", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

/* Fetch single product */
export async function getProductById(
  id: string
): Promise<Product | null> {
  const res = await fetch(
    `https://fakestoreapi.com/products/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return null;
  }

  const data = await res.json();

  if (!data || !data.id) {
    return null;
  }

  return data;
}
