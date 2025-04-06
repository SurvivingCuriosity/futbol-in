import { ResponderInscripcionCompeticionRequest, ResponderInscripcionCompeticionResponse } from "@/client/shared/client/types/Competiciones/CompeticionesBase/ResponderInscripcionCompeticion";
import { Equipo } from "@/server/models/Equipo/Equipo.model";
import { CompeticionesService } from "@/server/services/Competiciones/CompeticionesService";
import { responderInscripcionCompeticionSchema } from "@/server/validations/competiciones/competicionesBase/responderInscripcionLigaValidation";
import { validateLoggedInUser } from "@/server/validations/shared/validateLoggedInUser";

export async function responderInscripcionCompeticionController(
  data: ResponderInscripcionCompeticionRequest
): Promise<ResponderInscripcionCompeticionResponse> { 
  await validateLoggedInUser();

  const { idCompeticion, idEquipo, aceptado} = responderInscripcionCompeticionSchema.parse(data);

  const equipo = await Equipo.findById(idEquipo);

  if (!equipo) {
    throw new Error("No se encontró el equipo en la base de datos");
  }

  await CompeticionesService.responderInscripcion(
    idCompeticion,
    equipo.id,
    aceptado
  );

  const response: ResponderInscripcionCompeticionResponse = {
    success: true,
  };
  return response;
}
