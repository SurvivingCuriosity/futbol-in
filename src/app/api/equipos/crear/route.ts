import { CrearEquipoRequest } from "@/client/shared/client/types/Equipos/CrearEquipo";
import { crearEquipoController } from "@/server/controllers/equipos/crearEquipoController";
import { errorResponse, successResponse } from "@/server/lib/httpResponse";

export async function POST(req: Request) {
  try {
    const spot: CrearEquipoRequest = await req.json();

    const response = await crearEquipoController(spot);

    return successResponse(response, 201);
  } catch (error) {
    return errorResponse(error);
  }
}
