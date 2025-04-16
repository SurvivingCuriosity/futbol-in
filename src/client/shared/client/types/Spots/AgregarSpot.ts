import { SpotDTO } from "@/server/models/Spot/SpotDTO";

export type AgregarSpotRequest = Omit<
  SpotDTO,
  "id" | "verificado" | "votes" | "addedByUserId" | 'idOperador'
>;

export interface AgregarSpotResponse {
  success: boolean;
  spot: SpotDTO;
  spotsCreados: number;
}
