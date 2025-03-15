import { TypedRequest } from "@/core/types/Request/TypedRequest";
import { errorResponse, successResponse } from "@/server/lib/httpResponse";
import { UserService } from "@/server/services/User/UserService";
import { validateLoggedInUser } from "@/server/validations/shared/validateLoggedInUser";

export async function POST(req: TypedRequest<{idUser: string}>) {
  try {
    const { idUser } = await req.json();

    await validateLoggedInUser()

    const userDb = await UserService.findById(idUser);
    
    if (!userDb) {
      return errorResponse("Usuario no existe", 404);
    }

    return successResponse(
      { success: true, user: UserService.mapToDTO(userDb) },
      200
    );
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
