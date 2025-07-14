import { UserDTO } from "futbol-in-core/types";
import { BaseClient } from "./BaseClient";
import { ActualizarPerfilOperadorRequest, ActualizarPerfilOperadorResponse } from "./types/User/ActualizarPerfilOperador";
import {
  CambiarEmailRequest,
  CambiarEmailResponse,
} from "./types/User/CambiarEmail";
import { CrearPerfilOperadorRequest, CrearPerfilOperadorResponse } from "./types/User/CrearPerfilOperador";
import { GetPerfilOperadorResponse } from "./types/User/GetPerfilOperador";
import { ReclamarSpotComoOperadorRequest, ReclamarSpotComoOperadorResponse } from "./types/User/ReclamarSpotComoOperador";
import { UpdateUserRequest, UpdateUserResponse } from "./types/User/UpdateUser";

export class UserClient {
  
  static async getUserById(
    idUser: string
  ): Promise<{ success: boolean; user: UserDTO }> {
    const response = await BaseClient.request<{
      success: boolean;
      user: UserDTO;
    }>(`/api/user/get`, {
      method: "POST",
      body: { idUser },
    });

    if (!response.ok) {
      throw new Error(response.error || "Error al obtener el usuario");
    }

    return response.data;
  }

  static async cambiarEmail(
    req: CambiarEmailRequest
  ): Promise<CambiarEmailResponse> {
    const response = await BaseClient.request<CambiarEmailResponse>(
      `/api/user/cambiar-email`,
      {
        method: "PUT",
        body: { req },
      }
    );

    if (!response.ok) {
      throw new Error(response.error || "Error al obtener el usuario");
    }

    return response.data;
  }
  
  static async updateUser(
    req: UpdateUserRequest
  ): Promise<UpdateUserResponse> {
    const response = await BaseClient.request<UpdateUserResponse>(
      `/api/user/update`,
      {
        method: "POST",
        body: req,
      }
    );

    if (!response.ok) {
      throw new Error(response.error || "Error al actualizar el usuario");
    }

    return response.data;
  }

  static async crearPerfilOperador(
    req: CrearPerfilOperadorRequest
  ): Promise<CrearPerfilOperadorResponse> {
    const response = await BaseClient.request<CrearPerfilOperadorResponse>(
      `/api/user/crear-perfil-operador`,
      {
        method: "POST",
        body: req,
      }
    );

    if (!response.ok) {
      throw new Error(response.error || "Error al crear el perfil de operador");
    }

    return response.data;
  }

  static async actualizarPerfilOperador(
    req: ActualizarPerfilOperadorRequest
  ): Promise<ActualizarPerfilOperadorResponse> {
    const response = await BaseClient.request<ActualizarPerfilOperadorResponse>(
      `/api/operador/update`,
      {
        method: "POST",
        body: req,
      }
    );

    if (!response.ok) {
      throw new Error(response.error || "Error al actualizar el perfil de operador");
    }

    return response.data;
  }

  static async getPerfilOperadorFromUserId(
    idUser: string
  ): Promise<GetPerfilOperadorResponse> {
    const response = await BaseClient.request<GetPerfilOperadorResponse>(
      `/api/user/get-perfil-operador`,
      {
        method: "POST",
        body: idUser,
      }
    );

    if (!response.ok) {
      throw new Error(response.error || "Error al crear el perfil de operador");
    }

    return response.data;
  }

  static async getPerfilOperadorFromOperadorId(
    idUser: string
  ): Promise<GetPerfilOperadorResponse> {
    const response = await BaseClient.request<GetPerfilOperadorResponse>(
      `/api/operador/get`,
      {
        method: "POST",
        body: idUser,
      }
    );

    if (!response.ok) {
      throw new Error(response.error || "Error al crear el perfil de operador");
    }

    return response.data;
  }

  static async reclamarSpotComoOperador(idOperador: ReclamarSpotComoOperadorRequest): Promise<ReclamarSpotComoOperadorResponse> {
    const response = await BaseClient.request<ReclamarSpotComoOperadorResponse>(
      `/api/user/reclamar-spot-como-operador`,
      {
        method: "POST",
        body: idOperador,
      }
    );

    if (!response.ok) {
      throw new Error(response.error || "Error al obtener el usuario");
    }

    return response.data;
  }

  static async cambiarImagenPerfil(req: string): Promise<{ success: boolean }> {
    const response = await BaseClient.request<{ success: boolean }>(
      `/api/user/cambiar-imagen-perfil`,
      {
        method: "PUT",
        body: { req },
      }
    );

    if (!response.ok) {
      throw new Error(response.error || "Error al obtener el usuario");
    }

    return response.data;
  }

  static async cambiarImagenPerfilOperador(req: string): Promise<{ success: boolean }> {
    const response = await BaseClient.request<{ success: boolean }>(
      `/api/operador/cambiar-imagen-perfil`,
      {
        method: "PUT",
        body: { req },
      }
    );

    if (!response.ok) {
      throw new Error(response.error || "Error al obtener el usuario");
    }

    return response.data;
  }
}
