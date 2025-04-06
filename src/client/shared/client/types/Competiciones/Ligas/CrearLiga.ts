import { LigaDTO } from "@/server/models/Competicion/Ligas/LigaDTO";

export type  CrearLigaRequest = Omit<LigaDTO, 'id' | 'createdByUserId' | 'estadoCompeticion'>

export interface CrearLigaResponse {
    success: boolean;
    liga: LigaDTO;
}