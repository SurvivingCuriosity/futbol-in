import { BaseClient } from "./BaseClient";
import {
  CrearLigaRequest,
  CrearLigaResponse,
} from "./types/Competiciones/Ligas/CrearLiga";
import {
  EditarLigaRequest,
  EditarLigaResponse,
} from "./types/Competiciones/Ligas/EditarLiga";

export class LigasClient {
  static async crearLiga(data: CrearLigaRequest): Promise<CrearLigaResponse> {
    const response = await BaseClient.request<CrearLigaResponse>(
      "/api/ligas/crear",
      {
        method: "POST",
        body: data,
      }
    );

    if (!response.ok) {
      throw new Error(response.error || "Error al crear liga");
    }

    return response.data;
  }

  static async actualizarLiga(
    data: EditarLigaRequest
  ): Promise<EditarLigaResponse> {
    const response = await BaseClient.request<EditarLigaResponse>(
      "/api/ligas/editar",
      {
        method: "POST",
        body: data,
      }
    );

    if (!response.ok) {
      throw new Error(response.error || "Error al actualizar liga");
    }

    return response.data;
  }

}
