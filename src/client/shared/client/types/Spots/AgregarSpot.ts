import { SpotDTO } from "futbol-in-core/types";

export type AgregarSpotRequest = Omit<
  SpotDTO,
  "id" | "verificado" | "votes" | "addedByUserId" | 'idOperador'
>;

export interface AgregarSpotResponse {
  success: boolean;
  spot: SpotDTO;
  spotsCreados: number;
}
