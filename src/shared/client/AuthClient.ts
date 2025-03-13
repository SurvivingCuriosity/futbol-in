import { BaseClient } from "./BaseClient";
import { CheckEmailResponse } from "./types/Auth/Login/CheckEmail";
import { CheckUsernameResponse } from "./types/Auth/Register/CheckUsername";
import { InitAccountRequest } from "./types/Auth/Register/InitAccount";

export class AuthClient {
  // Login
  static async checkEmail({email}:{email: string}): Promise<CheckEmailResponse> {
    const response = await BaseClient.request<CheckEmailResponse>(
      "/api/login/check-email",
      {
        method: "POST",
        body: email,
      }
    );

    if (!response.ok) {
      throw new Error(response.error || "Error en checkEmail");
    }

    return response.data;
  }

  // Confirmar email
  static async confirmEmail({code}:{code: string}): Promise<boolean> {
    const response = await BaseClient.request<void>(
      "/api/register/confirm-email",
      {
        method: "POST",
        body: code,
      }
    );

    if (!response.ok) {
      throw new Error(response.error || "Error en confirmEmail");
    }

    return true;
  }

  // Init account
  static async initAccount(req:InitAccountRequest): Promise<boolean> {
    
    const { username, password } = req;

    const response = await BaseClient.request<void>(
      "/api/register/init-account",
      {
        method: "POST",
        body: { username, password },
      }
    );

    if (!response.ok) {
      throw new Error(response.error || "Error en initAccount");
    }

    return true;
  }

  static async checkUsername(username:string): Promise<CheckUsernameResponse> {
    const response = await BaseClient.request<CheckUsernameResponse>(
      `/api/register/check-username?username=${username}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error(response.error || "Error en checkUsername");
    }

    return response.data;
  }

  static async initUsername({username}:{username: string}): Promise<boolean> {
    const response = await BaseClient.request<void>(
      "/api/register/init-username",
      {
        method: "POST",
        body: { username },
      }
    );

    if (!response.ok) {
      throw new Error(response.error || "Error en initUsername");
    }

    return true;
  }

  static async registerEmail(email: string): Promise<boolean> {
    const response = await BaseClient.request<void>(
      "/api/register/email",
      {
        method: "POST",
        body: { email },
      }
    );

    if (!response.ok) {
      throw new Error(response.error || "Error en registerEmail");
    }

    return true;
  }
}
