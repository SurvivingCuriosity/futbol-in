import { SpotDTO } from "futbol-in-core/types";

export type EditarSpotRequest = Partial<SpotDTO>

export interface EditarSpotResponse {
  success: boolean;
  updatedSpot: SpotDTO;
}
