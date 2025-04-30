import { authOptions } from "@/server/lib/authOptions";
import connectDb from "@/server/lib/db";
import { errorResponse, successResponse } from "@/server/lib/httpResponse";
import { UserService } from "@/server/services/User/UserService";
import { getServerSession } from "next-auth";

export async function PUT(req: Request) {
  try {
    // Obtener sesión del usuario autenticado
    const session = await getServerSession(authOptions);

    const userDb = await UserService.findById(session?.user?.id);

    if (!session || !userDb?.idOperador) {
      return errorResponse("No autorizado", 401);
    }

    // Extraer datos del body
    const request = await req.json();

    const nuevaUrl = request.req;

    await connectDb();

    // Buscar usuario actual por email de sesión
    const operador = await UserService.getPerfilOperador(userDb.idOperador.toString());
    if (!operador) {
      return errorResponse("Usuario no encontrado", 404);
    }

    operador.logo = nuevaUrl;

    await operador.save();

    const response = {
      success: true,
    };

    return successResponse(response, 200);
  } catch (error) {
    console.error("Error al cambiar la imagen:", error);
    return errorResponse("Error interno del servidor", 500);
  }
}
