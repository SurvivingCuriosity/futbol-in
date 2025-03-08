import { SpotDTO } from "@/shared/models/Spot/SpotDTO";

export interface VotarSpotRequest {
  spotId: string;
  vote: "up" | "down";
}

export interface VotarSpotResponse {
  success: boolean;
  spot: SpotDTO
}