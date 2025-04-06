import { EditarTorneoRequest } from "@/client/shared/client/types/Competiciones/Torneos/EditarTorneo";
import { handleError } from "@/packages/utils/getErrorMessage";
import { editarTorneoController } from "@/server/controllers/competiciones/torneos/editarTorneoController";
import { successResponse } from "@/server/lib/httpResponse";

export async function POST(req: Request) {
  try {
    const request: EditarTorneoRequest = await req.json();

    const {data, idCompeticion} = request

    const response = await editarTorneoController({idCompeticion, data});

    return successResponse(response, 201);
  } catch (error) {
    return handleError(error);
  }
}
