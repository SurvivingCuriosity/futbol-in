import { LigaDTO } from "futbol-in-core/types";

export type JoinLigaRequest = { idLiga: string; idEquipo: string };

export interface JoinLigaResponse {
  success: boolean;
  updatedLiga: LigaDTO;
}
