import { EditarSpotRequest, EditarSpotResponse } from "@/client/shared/client/types/Spots/EditarSpot";
import { SpotDTO } from "@/server/models/Spot/SpotDTO";
import { SpotService } from "@/server/services/Spots/SpotsService";
import { UserService } from "@/server/services/User/UserService";
import { validateLoggedInUser } from "@/server/validations/shared/validateLoggedInUser";
import { editarSpotSchema } from "@/server/validations/spots/editarSpotValidation";

export async function editarSpotController(
  data: EditarSpotRequest
): Promise<EditarSpotResponse> {
  // Validar usuario que realiza la peticion
  const userDb = await validateLoggedInUser();

  // Validar request
  const spot = editarSpotSchema.parse(data) as SpotDTO;

  // Crear el spot
  const updatedSpot = await SpotService.updateSpot(spot.id, spot);

  // Incrementar el número de spots creados por el usuario
  await UserService.incrementUserStat(userDb.id, "addedFutbolines");

  if(updatedSpot === undefined){
    throw new Error("No se pudo actualizar el spot")
  }

  // Respuesta
  const response: EditarSpotResponse = {
    success: true,
    updatedSpot: updatedSpot,
  };
  return response;
}
