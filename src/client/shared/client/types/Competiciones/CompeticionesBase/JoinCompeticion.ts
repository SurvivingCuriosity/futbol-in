import { CompeticionBaseDTO } from "@/server/models/Competicion/CompeticionBase/CompeticionBaseDTO";

export type JoinCompeticionRequest = { idCompeticion: string; idEquipo: string };

export interface JoinCompeticionResponse {
  success: boolean;
  updatedCompeticion: CompeticionBaseDTO;
}
