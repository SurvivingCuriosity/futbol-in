import { BaseClient } from "./BaseClient";
import {
  CrearTorneoRequest,
  CrearTorneoResponse,
} from "./types/Competiciones/Torneos/CrearTorneo";
import {
  EditarTorneoRequest,
  EditarTorneoResponse,
} from "./types/Competiciones/Torneos/EditarTorneo";

export class TorneosClient {
  static async crearTorneo(
    data: CrearTorneoRequest
  ): Promise<CrearTorneoResponse> {
    const response = await BaseClient.request<CrearTorneoResponse>(
      "/api/torneos/crear",
      {
        method: "POST",
        body: data,
      }
    );

    if (!response.ok) {
      throw new Error(response.error || "Error al crear competicion");
    }

    return response.data;
  }

  static async actualizarTorneo(
    data: EditarTorneoRequest
  ): Promise<EditarTorneoResponse> {
    const response = await BaseClient.request<EditarTorneoResponse>(
      "/api/torneos/editar",
      {
        method: "POST",
        body: data,
      }
    );

    if (!response.ok) {
      throw new Error(response.error || "Error al actualizar competicion");
    }

    return response.data;
  }
}
