import { SpotService } from "@/server/services/Spots/SpotsService";
import { validateLoggedInUser } from "@/server/validations/shared/validateLoggedInUser";
import { ReclamarSpotComoOperadorRequest, ReclamarSpotComoOperadorResponse } from './../../../client/shared/client/types/User/ReclamarSpotComoOperador';

export async function reclamarSpotComoOperadorController(
  idSpot: ReclamarSpotComoOperadorRequest
): Promise<ReclamarSpotComoOperadorResponse> {
  // Validar usuario que realiza la peticion
  const userDb = await validateLoggedInUser();

  if(!idSpot){
    return {
      success: false,
      updatedSpot: undefined
    };
  }

  if(!userDb.idOperador){
    return {
      success: false,
      updatedSpot: undefined
    };
  }

  // Actualización del spot
  const updatedSpot = await SpotService.updateSpot(idSpot, {idOperador: userDb.idOperador.toString()});

  if(!updatedSpot){
    return {
      success: false,
      updatedSpot: undefined
    };
  }


  return {
    updatedSpot: updatedSpot,
    success: true,
  };
}
