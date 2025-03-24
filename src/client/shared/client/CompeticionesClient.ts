import { BaseClient } from "./BaseClient";
import { CrearCompeticionRequest, CrearCompeticionResponse } from "./types/Competiciones/CrearCompeticion";

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
}
