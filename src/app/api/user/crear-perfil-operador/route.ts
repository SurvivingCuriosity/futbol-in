import { CrearPerfilOperadorRequest } from "@/client/shared/client/types/User/CrearPerfilOperador";
import { crearPerfilOperadorController } from "@/server/controllers/user/crearPerfilOperadorController";
import { errorResponse, successResponse } from "@/server/lib/httpResponse";

export async function POST(req: Request) {
  try {
    const request: CrearPerfilOperadorRequest = await req.json();

    const response = await crearPerfilOperadorController(request);

    return successResponse(response, 200);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
