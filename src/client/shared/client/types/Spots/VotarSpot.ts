import { SpotDTO } from "futbol-in-core/types";

export interface VotarSpotRequest {
  spotId: string;
  vote: "up" | "down";
}

export interface VotarSpotResponse {
  success: boolean;
  spot: SpotDTO
}