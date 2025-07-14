import { PartidoDTO } from "futbol-in-core/types";

export interface CompletarPartidosRequest {
    idLiga: string;
    idEnfrentamiento: string;
    partidos: Array<Partial<PartidoDTO>>;
}

export interface CompletarPartidosResponse {
    success: boolean;
}