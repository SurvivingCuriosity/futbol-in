import { VotarSpotRequest } from "@/client/shared/client/types/Spots/VotarSpot";
import { deshacerVotoController } from "@/server/controllers/spots/deshacerVotoController";
import { errorResponse, successResponse } from "@/server/lib/httpResponse";

export async function POST(req: Request) {
  try {
    const request: VotarSpotRequest = await req.json();

    const response = await deshacerVotoController(request);

    return successResponse(response, 200);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
