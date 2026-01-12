import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://dummyjson.com/products", {
      cache: "no-store",
    });

    const data = await res.json();
    return NextResponse.json(data.products);
  } catch {
    return NextResponse.json([]);
  }
}
