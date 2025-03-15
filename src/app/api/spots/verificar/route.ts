import { VerificarSpotRequest } from "@/client/shared/client/types/Spots/VerificarSpot";
import { verificarSpotController } from "@/server/controllers/spots/verificarSpotController";
import { errorResponse, successResponse } from "@/server/lib/httpResponse";

export async function POST(req: Request) {
  try {
    const request: VerificarSpotRequest = await req.json();

    const response = await verificarSpotController(request);

    return successResponse(response, 200);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
