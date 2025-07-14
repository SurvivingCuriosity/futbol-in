import { SpotDTO } from "futbol-in-core/types";

export interface VerificarSpotRequest {
  spotId: string;
  vote: "up" | "down";
}

export interface VerificarSpotResponse {
  success: boolean;
  spot: SpotDTO
}