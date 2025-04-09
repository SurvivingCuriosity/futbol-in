import { EliminarLigaRequest } from "@/client/shared/client/types/Competiciones/Ligas/EliminarLiga";
import { errorResponse, successResponse } from "@/server/lib/httpResponse";
import { LigasService } from "@/server/services/Competiciones/Ligas/LigasService";
import { validateLoggedInUser } from "@/server/validations/shared/validateLoggedInUser";

export async function POST(req: Request) {
  try {
    const userDb = await validateLoggedInUser();

    const data: EliminarLigaRequest = await req.json();

    await LigasService.eliminarLiga(data.idLiga, userDb.id);

    return successResponse({ success: true }, 201);
  } catch (error) {
    return errorResponse(error);
  }
}
