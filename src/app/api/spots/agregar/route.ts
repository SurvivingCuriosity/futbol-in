import {
  AgregarSpotRequest,
  AgregarSpotResponse,
} from "@/shared/client/types/Spots/AgregarSpot";
import { UserRole } from "@/shared/enum/User/Role";
import { authOptions } from "@/shared/lib/authOptions";
import { errorResponse, successResponse } from "@/shared/lib/httpResponse";
import { SpotService } from "@/shared/services/Spots/SpotsService";
import { UserService } from "@/shared/services/User/UserService";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  try {
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

    if (!user) {
      return errorResponse("Debes volver a iniciar sesión", 401);
    }

    const userDb = await UserService.findById(user.id);

    if (!userDb) {
      return errorResponse("No se encontró al usuario en la base de datos", 401);
    }

    // Estado de verificado
    const verificado =
      user.id && user?.role === UserRole.VERIFICADO
        ? {
            idUser: user.id,
            fechaVerificacion: new Date(),
          }
        : null;

    // Creación del spot
    const spotDTO = { ...spot, addedByUserId: user.id, verificado };
    const createdSpot = await SpotService.createSpot(spotDTO);

    // Actualizar los spots añadidos por el usuario
    if (user) {
      await UserService.incrementUserStat(user.id, "addedFutbolines");
    }

    const response: AgregarSpotResponse = {
      success: true,
      spot: createdSpot,
      spotsCreados: userDb?.stats?.addedFutbolines + 1,
    };

    // Respuesta
    return successResponse(response, 201);
  } catch (error) {
    return errorResponse(error);
  }
}
