import { LigaDTO } from "futbol-in-core/types";

export type  EditarLigaRequest = {idCompeticion:string, data:Partial<LigaDTO>}

export interface EditarLigaResponse {
    success: boolean;
    updatedCompeticion: LigaDTO;
}