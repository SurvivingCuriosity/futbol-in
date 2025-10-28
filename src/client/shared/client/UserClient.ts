import { UserDTO } from "futbol-in-core/types";
import { BaseClient } from "./BaseClient";
import {
  CambiarEmailRequest,
  CambiarEmailResponse,
} from "./types/User/CambiarEmail";
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
}
