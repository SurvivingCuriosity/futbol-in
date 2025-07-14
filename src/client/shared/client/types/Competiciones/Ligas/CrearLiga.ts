import { LigaDTO } from "futbol-in-core/types";

export type  CrearLigaRequest = Omit<LigaDTO, 'id' | 'createdByUserId' | 'estadoCompeticion'>

export interface CrearLigaResponse {
    success: boolean;
    liga: LigaDTO;
}