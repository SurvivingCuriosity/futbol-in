import { UserService } from "@/server/services/User/UserService";
import { TypedRequest } from "@/core/types/Request/TypedRequest";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/lib/authOptions";
import { errorResponse, successResponse } from "@/server/lib/httpResponse";

export async function POST(req: TypedRequest<{idUser: string}>) {
  try {
    const { idUser } = await req.json();

    // Obtención del usuario que realiza la petición
    const session = await getServerSession(authOptions);
    const user = session?.user;
    if (!user?.id) {
      return errorResponse("No autenticado", 401);
    }

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
