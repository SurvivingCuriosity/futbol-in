import { CompeticionDTO } from "@/server/models/Competicion/CompeticionDTO";

export type  JoinCompeticionRequest = {idCompeticion:string, idEquipo:string}

export interface JoinCompeticionResponse {
    success: boolean;
    updatedCompeticion: CompeticionDTO;
}