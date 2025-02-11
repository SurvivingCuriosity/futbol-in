// src/app/api/places-autocomplete/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const input = searchParams.get("input") || "";

  // Tu API KEY solo en el server
  const key = process.env.NEXT_PUBLIC_MAPS_API_KEY!;

  console.log(key);

  // Llama a la API de Google
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json` +
    `?input=${encodeURIComponent(input)}` +
    `&key=${key}` +
    `&types=establishment` +
    `&components=country:es`;
  
  const res = await fetch(url);
  const data = await res.json();
  
  return NextResponse.json(data);
}
