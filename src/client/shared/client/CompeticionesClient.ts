import { BaseClient } from "./BaseClient";
import {
  EditarCompeticionRequest,
  EditarCompeticionResponse,
} from "./types/Competiciones/CompeticionesBase/EditarCompeticion";
import {
  JoinCompeticionRequest,
  JoinCompeticionResponse,
} from "./types/Competiciones/CompeticionesBase/JoinCompeticion";
import { ResponderInscripcionCompeticionRequest, ResponderInscripcionCompeticionResponse } from "./types/Competiciones/CompeticionesBase/ResponderInscripcionCompeticion";

export class CompeticionesClient {
  static async editar(
    data: EditarCompeticionRequest
  ): Promise<EditarCompeticionResponse> {
    const response = await BaseClient.request<EditarCompeticionResponse>(
      "/api/competiciones/editar",
      {
        method: "POST",
        body: data,
      }
    );

    if (!response.ok) {
      throw new Error(response.error || "Error al editar liga");
    }

    return response.data;
  }

  static async join(
    data: JoinCompeticionRequest
  ): Promise<JoinCompeticionResponse> {
    const response = await BaseClient.request<JoinCompeticionResponse>(
      "/api/competiciones/join",
      {
        method: "POST",
        body: data,
      }
    );

    if (!response.ok) {
      throw new Error(response.error || "Error al actualizar liga");
    }

    return response.data;
  }

  static async responderInscripcionCompeticion(
    data: ResponderInscripcionCompeticionRequest
  ): Promise<ResponderInscripcionCompeticionResponse> {
    const response =
      await BaseClient.request<ResponderInscripcionCompeticionResponse>(
        "/api/competiciones/responder-inscripcion",
        {
          method: "POST",
          body: data,
        }
      );

    if (!response.ok) {
      throw new Error(response.error || "Error al responder inscripción");
    }

    return response.data;
  }
}
