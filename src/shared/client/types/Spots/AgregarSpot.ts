import { SpotDTO } from "@/shared/models/Spot/SpotDTO";

export type AgregarSpotRequest = Omit<SpotDTO, "id" | "verificado" | "votes">;

export interface AgregarSpotResponse {
  success: boolean;
  spot: SpotDTO;
}
