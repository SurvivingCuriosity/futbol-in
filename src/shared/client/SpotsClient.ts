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
