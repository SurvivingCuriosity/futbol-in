import { EquipoDTO } from "@/server/models/Equipo/EquipoDTO";
import { BaseClient } from "./BaseClient";
import { CrearEquipoRequest, CrearEquipoResponse } from "./types/Equipos/CrearEquipo";
import { ResponderInvitacionRequest, ResponderInvitacionResponse } from "./types/Equipos/ResponderInvitacion";

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

  static async eliminarEquipo(idEquipo: string): Promise<{success:boolean}> {
    const response = await BaseClient.request<{success:boolean}>(
      "/api/equipos/eliminar",
      {
        method: "POST",
        body: idEquipo,
      }
    );
    
    if (!response.ok) {
      throw new Error(response.error || "Error al crear el equipo");
    }

    return response.data;
  }

  static async responderInvitacion(data: ResponderInvitacionRequest): Promise<ResponderInvitacionResponse> {
    const response = await BaseClient.request<ResponderInvitacionResponse>(
      "/api/equipos/responder-invitacion",
      {
        method: "POST",
        body: data,
      }
    );
    
    if (!response.ok) {
      throw new Error(response.error || "Error al responder la invitacion");
    }

    return response.data;
  }
}
