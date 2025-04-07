import { LigaDTO } from "@/server/models/Competicion/Ligas/LigaDTO";

export type JoinLigaRequest = { idLiga: string; idEquipo: string };

export interface JoinLigaResponse {
  success: boolean;
  updatedLiga: LigaDTO;
}
