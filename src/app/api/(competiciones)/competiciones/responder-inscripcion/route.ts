import { ResponderInscripcionCompeticionRequest } from "@/client/shared/client/types/Competiciones/CompeticionesBase/ResponderInscripcionCompeticion";
import { handleError } from "@/packages/utils/getErrorMessage";
import { responderInscripcionCompeticionController } from "@/server/controllers/competiciones/competicionesBase/responderInscripcionCompeticionController";
import { successResponse } from "@/server/lib/httpResponse";

export async function POST(req: Request) {
  try {
    const request: ResponderInscripcionCompeticionRequest = await req.json();

    const { aceptado, idCompeticion, idEquipo } = request;

    const response = await responderInscripcionCompeticionController({
      aceptado,
      idCompeticion,
      idEquipo,
    });

    return successResponse(response, 201);
  } catch (error) {
    return handleError(error);
  }
}
