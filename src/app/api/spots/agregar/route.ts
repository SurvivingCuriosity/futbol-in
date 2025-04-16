import { AgregarSpotRequest } from "@/client/shared/client/types/Spots/AgregarSpot";
import { handleError } from "@/packages/utils/getErrorMessage";
import { agregarSpotController } from "@/server/controllers/spots/agregarSpotController";
import { successResponse } from "@/server/lib/httpResponse";

export async function POST(req: Request) {
  try {
    const spot: AgregarSpotRequest = await req.json();

    const response = await agregarSpotController(spot);

    return successResponse(response, 201);
  } catch (error) {
    return handleError(error);
  }
}
