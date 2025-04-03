import { CompeticionDTO } from "@/server/models/Competicion/CompeticionDTO";

export type  CrearCompeticionRequest = Omit<CompeticionDTO, 'id' | 'createdByUserId' | 'estadoCompeticion'>

export interface CrearCompeticionResponse {
    success: boolean;
    competicion: CompeticionDTO;
}