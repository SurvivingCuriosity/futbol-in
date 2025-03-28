import { ResponderInvitacionRequest } from "@/client/shared/client/types/Equipos/ResponderInvitacion";
import { errorResponse, successResponse } from "@/server/lib/httpResponse";
import { EquipoService } from "@/server/services/Equipo/EquipoService";
import { validateLoggedInUser } from "@/server/validations/shared/validateLoggedInUser";

export async function POST(req: Request) {
  try {
    await validateLoggedInUser();

    const {estado,idEquipo,idJugador}: ResponderInvitacionRequest = await req.json();

    
    await EquipoService.responderInvitacion(idEquipo, idJugador, estado);

    return successResponse({success:true}, 201);
  } catch (error) {
    return errorResponse(error);
  }
}
