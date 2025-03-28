import { CrearCompeticionRequest } from "@/client/shared/client/types/Competiciones/CrearCompeticion";
import { crearCompeticionController } from "@/server/controllers/competiciones/crearCompeticionController";
import { errorResponse, successResponse } from "@/server/lib/httpResponse";

export async function POST(req: Request) {
  try {
    const competicion: CrearCompeticionRequest = await req.json();

    const response = await crearCompeticionController(competicion);

    return successResponse(response, 201);
  } catch (error) {
    return errorResponse(error);
  }
}
