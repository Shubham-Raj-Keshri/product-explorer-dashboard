import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const res = await fetch(
      `https://fakestoreapi.com/products/${params.id}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      return NextResponse.json(null, { status: 200 });
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("API /products/[id] error:", error);
    return NextResponse.json(null, { status: 200 });
  }
}
