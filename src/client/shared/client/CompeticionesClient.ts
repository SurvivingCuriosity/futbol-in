import { BaseClient } from "./BaseClient";
import { CrearCompeticionRequest, CrearCompeticionResponse } from "./types/Competiciones/CrearCompeticion";
import { EditarCompeticionRequest, EditarCompeticionResponse } from "./types/Competiciones/EditarCompeticion";
import { JoinCompeticionRequest, JoinCompeticionResponse } from "./types/Competiciones/JoinCompeticionRequest";

export class CompeticionesClient {

  static async crearCompeticion(data: CrearCompeticionRequest): Promise<CrearCompeticionResponse> {
    const response = await BaseClient.request<CrearCompeticionResponse>(
      "/api/competiciones/crear",
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

  static async actualizarCompeticion(data: EditarCompeticionRequest): Promise<EditarCompeticionResponse> {
    const response = await BaseClient.request<EditarCompeticionResponse>(
      "/api/competiciones/editar",
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

  static async joinCompeticion(data: JoinCompeticionRequest): Promise<JoinCompeticionResponse> {
    const response = await BaseClient.request<JoinCompeticionResponse>(
      "/api/competiciones/join",
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
