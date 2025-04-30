import { ActualizarPerfilOperadorRequest } from "@/client/shared/client/types/User/ActualizarPerfilOperador";
import { updateOperadorController } from "@/server/controllers/user/updateOperadorController";
import { errorResponse, successResponse } from "@/server/lib/httpResponse";

export async function POST(req: Request) {
  try {
    const request: ActualizarPerfilOperadorRequest = await req.json();

    const response = await updateOperadorController(request);

    return successResponse(response, 200);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
