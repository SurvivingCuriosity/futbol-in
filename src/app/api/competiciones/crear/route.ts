import { CrearCompeticionRequest } from "@/client/shared/client/types/Competiciones/CrearCompeticion";
import { crearCompeticionController } from "@/server/controllers/competiciones/crearCompeticionController";
import { errorResponse, successResponse } from "@/server/lib/httpResponse";

export async function POST(req: Request) {
  try {
    console.log('Creando competicion')
    const competicion: CrearCompeticionRequest = await req.json();

    console.log(competicion)
    const response = await crearCompeticionController(competicion);

    return successResponse(response, 201);
  } catch (error) {
    return errorResponse(error);
  }
}
