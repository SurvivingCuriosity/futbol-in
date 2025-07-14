import { CompeticionBaseDTO } from "futbol-in-core/types";

export type JoinCompeticionRequest = { idCompeticion: string; idEquipo: string };

export interface JoinCompeticionResponse {
  success: boolean;
  updatedCompeticion: CompeticionBaseDTO;
}
