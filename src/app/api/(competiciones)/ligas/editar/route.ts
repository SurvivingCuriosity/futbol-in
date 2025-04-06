import { EditarLigaRequest } from "@/client/shared/client/types/Competiciones/Ligas/EditarLiga";
import { handleError } from "@/packages/utils/getErrorMessage";
import { editarLigaController } from "@/server/controllers/competiciones/ligas/editarLigaController";
import { successResponse } from "@/server/lib/httpResponse";

export async function POST(req: Request) {
  try {
    const request: EditarLigaRequest = await req.json();

    const {data, idCompeticion} = request

    const response = await editarLigaController({idCompeticion, data});

    return successResponse(response, 201);
  } catch (error) {
    return handleError(error);
  }
}
