import { CompeticionDTO } from "@/server/models/Competicion/CompeticionDTO";

export type  CrearCompeticionRequest = Omit<CompeticionDTO, 'id' | 'createdByUserId'>

export interface CrearCompeticionResponse {
    success: boolean;
    competicion: CompeticionDTO;
}