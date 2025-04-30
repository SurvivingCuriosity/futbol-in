import { TypedRequest } from "@/core/types/Request/TypedRequest";
import { errorResponse, successResponse } from "@/server/lib/httpResponse";
import { UserService } from "@/server/services/User/UserService";

export async function POST(req: TypedRequest<string>) {
  try {
    const idOperador = await req.json();


    const operador = await UserService.getPerfilOperador(
      idOperador?.toString()
    );

    if (!operador) {
      return errorResponse("Operador no existe", 404);
    }

    return successResponse(
      { success: true, operador: UserService.mapOperadorToDTO(operador) },
      200
    );
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
