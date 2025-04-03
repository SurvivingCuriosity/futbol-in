import { EditarCompeticionRequest } from "@/client/shared/client/types/Competiciones/EditarCompeticion";
import { handleError } from "@/packages/utils/getErrorMessage";
import { editarCompeticionController } from "@/server/controllers/competiciones/editarCompeticionController";
import { successResponse } from "@/server/lib/httpResponse";

export async function POST(req: Request) {
  try {
    const request: EditarCompeticionRequest = await req.json();

    const {data, idCompeticion} = request

    const response = await editarCompeticionController({idCompeticion, data});

    return successResponse(response, 201);
  } catch (error) {
    return handleError(error);
  }
}
