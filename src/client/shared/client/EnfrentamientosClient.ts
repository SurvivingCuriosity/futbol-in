import { BaseClient } from "./BaseClient";
import {
  CompletarPartidosRequest,
  CompletarPartidosResponse,
} from "./types/Competiciones/Enfrentamientos/CompletarPartidosRequest";

export class EnfrentamientosClient {
  static async completarPartidos(
    data: CompletarPartidosRequest
  ): Promise<CompletarPartidosResponse> {
    const response = await BaseClient.request<CompletarPartidosResponse>(
      "/api/ligas/completar-partidos",
      {
        method: "POST",
        body: data,
      }
    );

    if (!response.ok) {
      throw new Error(response.error || "Error al completar partidos de liga");
    }

    return response.data;
  }
}
