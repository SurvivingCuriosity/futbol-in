import {
  VerificarSpotRequest,
  VerificarSpotResponse,
} from "@/client/shared/client/types/Spots/VerificarSpot";
import { SpotService } from "@/server/services/Spots/SpotsService";
import { validateLoggedInUser } from "@/server/validations/shared/validateLoggedInUser";
import { verificarSpotSchema } from "@/server/validations/spots/verificarSpotValidation";

export async function verificarSpotController(
  data: VerificarSpotRequest
): Promise<VerificarSpotResponse> {
  // Validar usuario que realiza la peticion
  const userDb = await validateLoggedInUser();

  // Validar request
  const { spotId, vote } = verificarSpotSchema.parse(data);

  // Actualización del spot
  const updatedSpot = await SpotService.verificarSpot(spotId, vote, userDb.id);

  return {
    spot: updatedSpot,
    success: true,
  };
}
