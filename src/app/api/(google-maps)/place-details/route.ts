import { errorResponse, successResponse } from "@/shared/lib/httpResponse";
import { GoogleMapsService } from "@/shared/services/GoogleMaps/GoogleMapsService";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const placeId = searchParams.get("placeId");
  
  console.log('placeid: ',placeId);

  if (!placeId) {
    return errorResponse("placeId es requerido", 400);
  }

  const res = await GoogleMapsService.getCoordinatesFromPlaceId(placeId);

  return successResponse(res);
}
