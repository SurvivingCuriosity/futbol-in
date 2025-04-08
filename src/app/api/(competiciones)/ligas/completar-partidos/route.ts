import { CompletarPartidosRequest } from "@/client/shared/client/types/Competiciones/Enfrentamientos/CompletarPartidosRequest";
import { completarPartidosController } from "@/server/controllers/competiciones/ligas/completarPartidosController";
import { errorResponse, successResponse } from "@/server/lib/httpResponse";

export async function POST(req: Request) {
  try {
    const data: CompletarPartidosRequest = await req.json();

    const response = await completarPartidosController(data);

    return successResponse(response, 201);
  } catch (error) {
    return errorResponse(error);
  }
}
