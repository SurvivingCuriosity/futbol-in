import { SpotDTO } from "futbol-in-core/types";

export type ReclamarSpotComoOperadorRequest = string

export interface ReclamarSpotComoOperadorResponse {
    success: boolean;
    updatedSpot: SpotDTO|undefined;
}