import { CrearLigaRequest } from "@/client/shared/client/types/Competiciones/Ligas/CrearLiga";
import { crearLigaController } from "@/server/controllers/competiciones/ligas/crearLigaController";
import { errorResponse, successResponse } from "@/server/lib/httpResponse";

export async function POST(req: Request) {
  try {
    const competicion: CrearLigaRequest = await req.json();

    console.log('En presentacion')

    const response = await crearLigaController(competicion);

    return successResponse(response, 201);
  } catch (error) {
    return errorResponse(error);
  }
}
