import { UserDTO } from "../models/User/UserDTO";
import { BaseClient } from "./BaseClient";

export class UserClient {
  static async getUserById(idUser: string): Promise<{success:boolean, user: UserDTO}> {
    const response = await BaseClient.request<{success:boolean, user: UserDTO}>(
      `/api/user/get`,
      {
        method: "POST",
        body: {idUser},
      }
    );

    if (!response.ok) {
      throw new Error(response.error || "Error al obtener el usuario");
    }

    return response.data;
  }

 
}
