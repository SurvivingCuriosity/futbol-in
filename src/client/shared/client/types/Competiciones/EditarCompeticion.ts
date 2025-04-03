import { CompeticionDTO } from "@/server/models/Competicion/CompeticionDTO";

export type  EditarCompeticionRequest = {idCompeticion:string, data:Partial<CompeticionDTO>}

export interface EditarCompeticionResponse {
    success: boolean;
    updatedCompeticion: CompeticionDTO;
}