import { UserDTO } from "@/server/models/User/UserDTO";
import { BaseClient } from "./BaseClient";
import {
  CambiarEmailRequest,
  CambiarEmailResponse,
} from "./types/User/CambiarEmail";

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

  static async getUserImageUrl(imagen: string): Promise<string> {
    const response = await BaseClient.request<{ url: string }>(
      `/api/storage/files?path=${encodeURIComponent(imagen)}`,
      {
        method: "GET",
      }
    );
    if (!imagen) {
      throw new Error("Intentando buscar imagen sin url");
    }
    if (!response.ok) {
      throw new Error(response.error || "Error al obtener el usuario");
    }
    const { url } = response.data;

    return url;
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
