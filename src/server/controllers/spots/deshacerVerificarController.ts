import {
  VerificarSpotRequest,
  VerificarSpotResponse,
} from "@/client/shared/client/types/Spots/VerificarSpot";
import { SpotService } from "@/server/services/Spots/SpotsService";
import { UserService } from "@/server/services/User/UserService";
import { validateLoggedInUser } from "@/server/validations/shared/validateLoggedInUser";
import { verificarSpotSchema } from "@/server/validations/spots/verificarSpotValidation";

export async function deshacerVerificarController(
  data: VerificarSpotRequest
): Promise<VerificarSpotResponse> {

  const userDb = await validateLoggedInUser();

  const { spotId, vote } = verificarSpotSchema.parse(data);

  const updatedSpot = await SpotService.deshacerVerificarSpot(spotId, vote, userDb.id);

  await UserService.decrementUserStat(updatedSpot.addedByUserId, "verifiedFutbolines");

  return {
    spot: updatedSpot,
    success: true,
  };
}
