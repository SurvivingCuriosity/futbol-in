import { EquipoDTO } from "@/server/models/Equipo/EquipoDTO";
import { BaseClient } from "./BaseClient";
import { CrearEquipoRequest, CrearEquipoResponse } from "./types/Equipos/CrearEquipo";

export class EquiposClient {

  static async getEquiposDeUsuario(idUser:string):Promise<EquipoDTO[]>{
    const response = await BaseClient.request<EquipoDTO[]>(
      "/api/equipos/byUserId",
      {
        method: "POST",
        body: idUser,
      }
    );

    if (!response.ok) {
      throw new Error(response.error || "Error al crear el equipo");
    }

    return response.data;
  }

  static async crearEquipo(data: CrearEquipoRequest): Promise<CrearEquipoResponse> {
    const response = await BaseClient.request<CrearEquipoResponse>(
      "/api/equipos/crear",
      {
        method: "POST",
        body: data,
      }
    );
    
    if (!response.ok) {
      throw new Error(response.error || "Error al crear el equipo");
    }

    return response.data;
  }
}
