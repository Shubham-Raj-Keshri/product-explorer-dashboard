import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const res = await fetch(
      `https://fakestoreapi.com/products/${params.id}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!res.ok) {
      return NextResponse.json(null, { status: 200 });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(null, { status: 200 });
  }
}
