import { errorResponse, successResponse } from "@/server/lib/httpResponse";
import { GoogleMapsService } from "@/server/services/GoogleMaps/GoogleMapsService";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const placeId = searchParams.get("placeId");

  if (!placeId) {
    return errorResponse("placeId es requerido", 400);
  }

  const res = await GoogleMapsService.getCoordinatesFromPlaceId(placeId);

  return successResponse(res);
}
