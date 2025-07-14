import { CompeticionBaseDTO } from "futbol-in-core/types";

export type  EditarCompeticionRequest = {idCompeticion:string, data:Partial<CompeticionBaseDTO>}

export interface EditarCompeticionResponse {
    success: boolean;
    updatedCompeticion: CompeticionBaseDTO;
}