import { TorneoDTO } from "@/server/models/Competicion/Torneos/TorneoDTO";

export type  EditarTorneoRequest = {idCompeticion:string, data:Partial<TorneoDTO>}

export interface EditarTorneoResponse {
    success: boolean;
    updatedTorneo: TorneoDTO;
}