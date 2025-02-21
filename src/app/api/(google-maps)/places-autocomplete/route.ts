import { successResponse } from '@/shared/lib/httpResponse';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const input = searchParams.get("input") || "";

  const key = process.env.NEXT_PUBLIC_MAPS_API_KEY!;

  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json` +
    `?input=${encodeURIComponent(input)}` +
    `&key=${key}` +
    `&types=establishment` +
    `&components=country:es`;
  
  const res = await fetch(url);
  const data = await res.json();
  
  return successResponse(data);
}
