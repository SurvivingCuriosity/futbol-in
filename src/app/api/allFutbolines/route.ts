import { errorResponse, successResponse } from "@/server/lib/httpResponse";
import { SpotService } from "@/server/services/Spots/SpotsService";

export async function GET() {
  try {
    const spots = await SpotService.getAll();

    return successResponse(spots, 200);
  } catch (err) {
    return errorResponse(err);
  }
}
