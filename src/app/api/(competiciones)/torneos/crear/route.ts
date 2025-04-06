import { CrearTorneoRequest } from "@/client/shared/client/types/Competiciones/Torneos/CrearTorneo";
import { crearTorneoController } from "@/server/controllers/competiciones/torneos/crearTorneoController";
import { errorResponse, successResponse } from "@/server/lib/httpResponse";

export async function POST(req: Request) {
  try {
    const competicion: CrearTorneoRequest = await req.json();

    const response = await crearTorneoController(competicion);

    return successResponse(response, 201);
  } catch (error) {
    return errorResponse(error);
  }
}
