import { EditarSpotRequest } from "@/client/shared/client/types/Spots/EditarSpot";
import { handleError } from "@/packages/utils/getErrorMessage";
import { editarSpotController } from "@/server/controllers/spots/editarSpotController";
import { successResponse } from "@/server/lib/httpResponse";

export async function POST(req: Request) {
  try {
    const spot: EditarSpotRequest = await req.json();

    const response = await editarSpotController(spot);

    return successResponse(response, 201);
  } catch (error) {
    return handleError(error);
  }
}
