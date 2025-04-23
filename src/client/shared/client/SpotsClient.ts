import { BaseClient } from "./BaseClient";
import { AgregarSpotRequest, AgregarSpotResponse } from "./types/Spots/AgregarSpot";
import { VerificarSpotRequest, VerificarSpotResponse } from "./types/Spots/VerificarSpot";
import { VotarSpotRequest, VotarSpotResponse } from "./types/Spots/VotarSpot";

export class SpotsClient {
  static async votarSpot(data: VotarSpotRequest): Promise<VotarSpotResponse> {
    const response = await BaseClient.request<VotarSpotResponse>(
      "/api/spots/votar",
      {
        method: "POST",
        body: data,
      }
    );

    if (!response.ok) {
      throw new Error(response.error || "Error en votarSpot");
    }

    return response.data;
  }

  static async deshacerVoto(data: VotarSpotRequest): Promise<VotarSpotResponse> {
    const response = await BaseClient.request<VotarSpotResponse>(
      "/api/spots/deshacer-votar",
      {
        method: "POST",
        body: data,
      }
    );

    if (!response.ok) {
      throw new Error(response.error || "Error en votarSpot");
    }

    return response.data;
  }

  static async borrarSpot(idSpot: string): Promise<void> {
    const response = await BaseClient.request<void>(
      "/api/spots/delete",
      {
        method: "POST",
        body: idSpot,
      }
    );

    if (!response.ok) {
      throw new Error(response.error || "Error en eliminar spot");
    }

    return response.data;
  }

  static async verificarSpot(data: VerificarSpotRequest): Promise<VerificarSpotResponse> {
    const response = await BaseClient.request<VerificarSpotResponse>(
      "/api/spots/verificar",
      {
        method: "POST",
        body: data,
      }
    );

    if (!response.ok) {
      throw new Error(response.error || "Error en votarSpot");
    }

    return response.data;
  }
  static async deshacerVerificarSpot(data: VerificarSpotRequest): Promise<VerificarSpotResponse> {
    const response = await BaseClient.request<VerificarSpotResponse>(
      "/api/spots/deshacer-verificar",
      {
        method: "POST",
        body: data,
      }
    );

    if (!response.ok) {
      throw new Error(response.error || "Error en votarSpot");
    }

    return response.data;
  }

  static async agregarSpot(data: AgregarSpotRequest): Promise<AgregarSpotResponse> {
    const response = await BaseClient.request<AgregarSpotResponse>(
      "/api/spots/agregar",
      {
        method: "POST",
        body: data,
      }
    );

    if (!response.ok) {
      throw new Error(response.error || "Error en votarSpot");
    }

    return response.data;
  }
}
