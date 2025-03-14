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

  static async cambiarEmail(
    req: CambiarEmailRequest
  ): Promise<CambiarEmailResponse> {
    const response = await BaseClient.request<CambiarEmailResponse>(
      `/api/user/cambiar-email`,
      {
        method: "PUT",
        body: {req},
      }
    );

    if (!response.ok) {
      throw new Error(response.error || "Error al obtener el usuario");
    }

    return response.data;
  }
}
