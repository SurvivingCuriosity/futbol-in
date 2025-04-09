import { BaseClient } from "./BaseClient";
import {
  CrearLigaRequest,
  CrearLigaResponse,
} from "./types/Competiciones/Ligas/CrearLiga";
import {
  EditarLigaRequest,
  EditarLigaResponse,
} from "./types/Competiciones/Ligas/EditarLiga";
import { EliminarLigaRequest, EliminarLigaResponse } from "./types/Competiciones/Ligas/EliminarLiga";
import { JoinLigaRequest, JoinLigaResponse } from "./types/Competiciones/Ligas/JoinLiga";

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

  static async joinLiga(data: JoinLigaRequest): Promise<JoinLigaResponse> {
    console.log('Liga client joinLiga', data)
    const response = await BaseClient.request<JoinLigaResponse>(
      "/api/ligas/join",
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

  static async borrarLiga(data: EliminarLigaRequest): Promise<EliminarLigaResponse> {
    const response = await BaseClient.request<EliminarLigaResponse>(
      "/api/ligas/eliminar",
      {
        method: "POST",
        body: data,
      }
    );

    if (!response.ok) {
      throw new Error(response.error || "Error al eliminar liga");
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
