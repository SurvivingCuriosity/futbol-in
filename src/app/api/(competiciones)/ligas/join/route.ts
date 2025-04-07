import { JoinLigaRequest } from "@/client/shared/client/types/Competiciones/Ligas/JoinLiga";
import { handleError } from "@/packages/utils/getErrorMessage";
import { joinLigaController } from "@/server/controllers/competiciones/ligas/joinLigaController";
import { successResponse } from "@/server/lib/httpResponse";

export async function POST(req: Request) {
  try {
    const request: JoinLigaRequest = await req.json();

    const { idEquipo, idLiga } = request;

    const response = await joinLigaController({
      idLiga,
      idEquipo,
    });

    return successResponse(response, 201);
  } catch (error) {
    return handleError(error);
  }
}
