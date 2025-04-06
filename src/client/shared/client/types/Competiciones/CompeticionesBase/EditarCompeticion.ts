import { CompeticionBaseDTO } from "@/server/models/Competicion/CompeticionBase/CompeticionBaseDTO";

export type  EditarCompeticionRequest = {idCompeticion:string, data:Partial<CompeticionBaseDTO>}

export interface EditarCompeticionResponse {
    success: boolean;
    updatedCompeticion: CompeticionBaseDTO;
}