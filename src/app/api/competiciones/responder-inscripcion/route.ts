import { ResponderInscripcionRequest } from "@/client/shared/client/types/Competiciones/ResponderInscripcion";
import { handleError } from "@/packages/utils/getErrorMessage";
import { responderInscripcionController } from "@/server/controllers/competiciones/responderInscripcionController";
import { successResponse } from "@/server/lib/httpResponse";

export async function POST(req: Request) {
  try {
    const request: ResponderInscripcionRequest = await req.json();

    const { idEquipo, idCompeticion, aceptado } = request;

    const response = await responderInscripcionController({
      idCompeticion,
      idEquipo,
      aceptado
    });

    return successResponse(response, 201);
  } catch (error) {
    return handleError(error);
  }
}
