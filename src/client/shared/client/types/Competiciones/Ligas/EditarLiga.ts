import { LigaDTO } from "@/server/models/Competicion/Ligas/LigaDTO";

export type  EditarLigaRequest = {idCompeticion:string, data:Partial<LigaDTO>}

export interface EditarLigaResponse {
    success: boolean;
    updatedCompeticion: LigaDTO;
}