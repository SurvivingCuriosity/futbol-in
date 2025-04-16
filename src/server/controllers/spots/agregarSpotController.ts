import {
  AgregarSpotRequest,
  AgregarSpotResponse,
} from "@/client/shared/client/types/Spots/AgregarSpot";
import { UserRole } from "@/core/enum/User/Role";
import { SpotDTO } from "@/server/models/Spot/SpotDTO";
import { SpotService } from "@/server/services/Spots/SpotsService";
import { UserService } from "@/server/services/User/UserService";
import { validateLoggedInUser } from "@/server/validations/shared/validateLoggedInUser";
import { agregarSpotSchema } from "@/server/validations/spots/agregarSpotValidation";

export async function agregarSpotController(
  data: AgregarSpotRequest
): Promise<AgregarSpotResponse> {
  // Validar usuario que realiza la peticion
  const userDb = await validateLoggedInUser();

  // Validar request
  const spot = agregarSpotSchema.parse(data) as SpotDTO;

  const idOperador = userDb?.idOperador;

  // Construir el objeto a crear
  const spotACrear = {
    ...spot,
    addedByUserId: userDb.id,
    verificado:
      userDb?.role?.includes(UserRole.VERIFICADO)
        ? {
            correcto: true,
            idUser: userDb.id,
            fechaVerificacion: new Date(),
          }
        : null,
      idOperador: idOperador?.toString() || null
  };

  // Crear el spot
  const createdSpot = await SpotService.createSpot(spotACrear);

  // Incrementar el número de spots creados por el usuario
  await UserService.incrementUserStat(userDb.id, "addedFutbolines");

  // Respuesta
  const response: AgregarSpotResponse = {
    success: true,
    spot: createdSpot,
    spotsCreados: userDb?.stats?.addedFutbolines + 1,
  };
  return response;
}
