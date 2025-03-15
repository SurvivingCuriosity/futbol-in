import {
  VotarSpotRequest,
  VotarSpotResponse,
} from "@/client/shared/client/types/Spots/VotarSpot";
import { SpotService } from "@/server/services/Spots/SpotsService";
import { validateLoggedInUser } from "@/server/validations/shared/validateLoggedInUser";
import { verificarSpotSchema } from "@/server/validations/spots/verificarSpotValidation";

export async function votarSpotController(
  data: VotarSpotRequest
): Promise<VotarSpotResponse> {
  // Validar usuario que realiza la peticion
  const userDb = await validateLoggedInUser();

  // Validar request
  const { spotId, vote } = verificarSpotSchema.parse(data);

  // Actualización del spot
  const updatedSpot = await SpotService.votarSpot(spotId, vote, userDb.id);

  return {
    spot: updatedSpot,
    success: true,
  };
}
