import { PartidoDTO } from "@/server/models/Partido/Partido.model";

export interface CompletarPartidosRequest {
    idLiga: string;
    idEnfrentamiento: string;
    partidos: Array<Omit<PartidoDTO, "id"|'enfrentamiento'>>;
}

export interface CompletarPartidosResponse {
    success: boolean;
}