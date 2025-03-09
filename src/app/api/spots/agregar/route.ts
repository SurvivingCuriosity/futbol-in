import { AgregarSpotRequest } from "@/shared/client/types/Spots/AgregarSpot";
import { UserRole } from "@/shared/enum/User/Role";
import { authOptions } from "@/shared/lib/authOptions";
import connectDb from "@/shared/lib/db";
import { errorResponse, successResponse } from "@/shared/lib/httpResponse";
import { SpotService } from "@/shared/services/Spots/SpotsService";
import { UserService } from "@/shared/services/User/UserService";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  try {
    await connectDb();
    const spot: AgregarSpotRequest = await req.json();

    const {
      nombre,
      direccion,
      coordinates: [lng, lat],
      googlePlaceId,
      tipoLugar,
      tipoFutbolin,
    } = spot;

    // Validacion inicial "superficial"
    if (
      !nombre ||
      !direccion ||
      !lat ||
      !lng ||
      !googlePlaceId ||
      !tipoLugar ||
      !tipoFutbolin
    ) {
      return errorResponse("Falta algún campo", 400);
    }

    // Obtención del usuario que realiza la petición
    const session = await getServerSession(authOptions);
    const user = session?.user;
    const userId = session?.user?.id || null;

    // Estado de verificado
    const verificado = userId && user?.role === UserRole.VERIFICADO ? {
      idUser: userId,
      fechaVerificacion: new Date(),
    } : null

    // Creación del spot
    const spotDTO = { ...spot, userId, verificado }
    const createdSpot = await SpotService.createSpot(spotDTO);

    // Actualizar los spots añadidos por el usuario
    if (user) {
      await UserService.incrementUserStat(user.id, "addedFutbolines");
    }

    // Respuesta
    return successResponse({ success: true, futbolin: createdSpot }, 201);
  } catch (error) {
    return errorResponse(error);
  }
}
