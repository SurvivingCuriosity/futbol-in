import { errorResponse, successResponse } from "@/shared/lib/httpResponse";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const placeId = searchParams.get("placeId");

  if (!placeId) {
    return errorResponse("placeId es requerido", 400);
  }

  const key = process.env.NEXT_PUBLIC_MAPS_API_KEY!;
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${key}&fields=geometry`;

  const res = await fetch(url);
  const data = await res.json();

  if (data.status !== "OK") {
    return errorResponse("No se pudo obtener el lugar", 500);
  }

  return successResponse(data.result.geometry.location);
}
