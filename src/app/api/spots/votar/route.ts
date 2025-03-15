import { VotarSpotRequest } from "@/client/shared/client/types/Spots/VotarSpot";
import { votarSpotController } from "@/server/controllers/spots/votarSpotController";
import { errorResponse, successResponse } from "@/server/lib/httpResponse";

export async function POST(req: Request) {
  try {
    const request: VotarSpotRequest = await req.json();

    const response = await votarSpotController(request);

    return successResponse(response, 200);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
