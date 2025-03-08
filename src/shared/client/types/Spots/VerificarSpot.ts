import { SpotDTO } from "@/shared/models/Spot/SpotDTO";

export interface VerificarSpotRequest {
  spotId: string;
  vote: "up" | "down";
}

export interface VerificarSpotResponse {
  success: boolean;
  spot: SpotDTO
}