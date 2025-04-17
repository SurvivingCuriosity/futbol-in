import { errorResponse, successResponse } from "@/server/lib/httpResponse";
import { SpotService } from "@/server/services/Spots/SpotsService";

export async function POST(req: Request) {
  try {
    const idEliminar: number = await req.json();

    await SpotService.deleteSpot(idEliminar.toString());

    return successResponse('Eliminado', 200);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
