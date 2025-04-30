import { SpotDTO } from "@/server/models/Spot/SpotDTO";

export type ReclamarSpotComoOperadorRequest = string

export interface ReclamarSpotComoOperadorResponse {
    success: boolean;
    updatedSpot: SpotDTO|undefined;
}