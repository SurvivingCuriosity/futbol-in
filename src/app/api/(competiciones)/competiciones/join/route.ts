import { JoinCompeticionRequest } from "@/client/shared/client/types/Competiciones/CompeticionesBase/JoinCompeticion";
import { handleError } from "@/packages/utils/getErrorMessage";
import { joinCompeticionController } from "@/server/controllers/competiciones/competicionesBase/joinCompeticionController";
import { successResponse } from "@/server/lib/httpResponse";

export async function POST(req: Request) {
  try {
    const request: JoinCompeticionRequest = await req.json();

    const { idEquipo, idCompeticion } = request;

    const response = await joinCompeticionController({
      idCompeticion,
      idEquipo,
    });

    return successResponse(response, 201);
  } catch (error) {
    return handleError(error);
  }
}
