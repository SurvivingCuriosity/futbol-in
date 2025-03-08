import { authOptions } from "@/shared/lib/authOptions";
import connectDb from "@/shared/lib/db";
import { errorResponse, successResponse } from "@/shared/lib/httpResponse";
import { SpotService } from "@/shared/services/Spots/SpotsService";
import { UserService } from "@/shared/services/User/UserService";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  try {
    await connectDb();
    const { spotId, vote } = await req.json();

    // Validaciones iniciales
    if (!spotId || !["up", "down"].includes(vote)) {
      return errorResponse("Datos inválidos", 400);
    }

    // Obtención del usuario que realiza la petición
    const session = await getServerSession(authOptions);
    const user = session?.user;
    if (!user?.id) {
      return errorResponse("No autenticado", 401);
    }
    const userDb = await UserService.findById(user.id);
    if (!userDb) {
      return errorResponse("Usuario no existe", 404);
    }

    // Verificar el spot a través del servicio
    const updatedSpot = await SpotService.verificarSpot(
      spotId,
      vote,
      userDb._id
    );

    await UserService.incrementUserStat(userDb.id, "votedFutbolines");

    return successResponse({ success: true, spot: updatedSpot }, 200);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
