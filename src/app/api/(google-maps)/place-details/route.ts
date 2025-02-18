// src/app/api/place-details/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const placeId = searchParams.get("placeId");

  if (!placeId) {
    return NextResponse.json({ error: "placeId es requerido" }, { status: 400 });
  }

  const key = process.env.NEXT_PUBLIC_MAPS_API_KEY!;
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${key}&fields=geometry`;

  const res = await fetch(url);
  const data = await res.json();
  console.log(data);

  if (data.status !== "OK") {
    return NextResponse.json({ error: "No se pudo obtener el lugar" }, { status: 500 });
  }

  return NextResponse.json(data.result.geometry.location);
}
