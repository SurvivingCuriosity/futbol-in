import { VerificarSpotRequest } from "@/client/shared/client/types/Spots/VerificarSpot";
import { deshacerVerificarController } from "@/server/controllers/spots/deshacerVerificarController";
import { errorResponse, successResponse } from "@/server/lib/httpResponse";

export async function POST(req: Request) {
  try {
    const request: VerificarSpotRequest = await req.json();

    const response = await deshacerVerificarController(request);

    return successResponse(response, 200);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
