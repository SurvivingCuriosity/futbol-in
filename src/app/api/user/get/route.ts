import { authOptions } from "@/shared/lib/authOptions";
import { errorResponse, successResponse } from "@/shared/lib/httpResponse";
import { UserService } from "@/shared/services/User/UserService";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
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
