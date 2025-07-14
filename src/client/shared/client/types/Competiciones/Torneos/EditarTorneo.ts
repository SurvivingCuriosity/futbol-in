import { TorneoDTO } from "futbol-in-core/types";

export type  EditarTorneoRequest = {idCompeticion:string, data:Partial<TorneoDTO>}

export interface EditarTorneoResponse {
    success: boolean;
    updatedTorneo: TorneoDTO;
}