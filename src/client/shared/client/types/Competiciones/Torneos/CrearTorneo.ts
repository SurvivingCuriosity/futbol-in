import { TorneoDTO } from "@/server/models/Competicion/Torneos/TorneoDTO";

export type  CrearTorneoRequest = Omit<TorneoDTO, 'id' | 'createdByUserId' | 'estadoCompeticion'>

export interface CrearTorneoResponse {
    success: boolean;
    torneo: TorneoDTO;
}