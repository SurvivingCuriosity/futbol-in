import { errorResponse, successResponse } from "@/server/lib/httpResponse";
import { EquipoService } from "@/server/services/Equipo/EquipoService";
import { validateLoggedInUser } from "@/server/validations/shared/validateLoggedInUser";

export async function POST(req: Request) {
  try {
    await validateLoggedInUser();

    const idEquipo: string = await req.json();

    await EquipoService.eliminarEquipo(idEquipo)

    return successResponse({success:true}, 201);
  } catch (error) {
    return errorResponse(error);
  }
}
