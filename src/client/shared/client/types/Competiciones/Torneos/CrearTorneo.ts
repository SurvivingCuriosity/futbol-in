import { TorneoDTO } from "futbol-in-core/types";

export type  CrearTorneoRequest = Omit<TorneoDTO, 'id' | 'createdByUserId' | 'estadoCompeticion'>

export interface CrearTorneoResponse {
    success: boolean;
    torneo: TorneoDTO;
}