import { SpotDTO } from "@/server/models/Spot/SpotDTO";

export interface VotarSpotRequest {
  spotId: string;
  vote: "up" | "down";
}

export interface VotarSpotResponse {
  success: boolean;
  spot: SpotDTO
}