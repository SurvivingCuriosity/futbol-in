import { PartidoDTO } from "@/server/models/Partido/Partido.model";

export interface CompletarPartidosRequest {
    idLiga: string;
    idEnfrentamiento: string;
    partidos: Array<Partial<PartidoDTO>>;
}

export interface CompletarPartidosResponse {
    success: boolean;
}