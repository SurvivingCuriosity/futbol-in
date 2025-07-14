import { TypedRequest } from "futbol-in-core/types";
import { errorResponse, successResponse } from "@/server/lib/httpResponse";
import { UserService } from "@/server/services/User/UserService";
import { validateLoggedInUser } from "@/server/validations/shared/validateLoggedInUser";

export async function POST(req: TypedRequest<string>) {
  try {
    const idUser = await req.json();

    await validateLoggedInUser();

    const user = await UserService.findById(idUser);

    console.log(user);

    if (!user?.idOperador) {
      return errorResponse("Operador no existe", 404);
    }

    const operador = await UserService.getPerfilOperador(
      user?.idOperador?.toString()
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
