import { SpotDTO } from "@/server/models/Spot/SpotDTO";

export type EditarSpotRequest = Partial<SpotDTO>

export interface EditarSpotResponse {
  success: boolean;
  updatedSpot: SpotDTO;
}
