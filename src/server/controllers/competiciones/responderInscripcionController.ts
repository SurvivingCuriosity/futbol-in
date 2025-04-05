import { ResponderInscripcionRequest } from "@/client/shared/client/types/Competiciones/ResponderInscripcion";
import { Equipo } from "@/server/models/Equipo/Equipo.model";
import { CompeticionesService } from "@/server/services/Competiciones/CompeticionesService";
import { responderInscripcionSchema } from "@/server/validations/competiciones/responderInscripcionValidation";
import { validateLoggedInUser } from "@/server/validations/shared/validateLoggedInUser";
import { ResponderInscripcionResponse } from './../../../client/shared/client/types/Competiciones/ResponderInscripcion';

export async function responderInscripcionController(
  data: ResponderInscripcionRequest
): Promise<ResponderInscripcionResponse> {
  await validateLoggedInUser();

  const { idCompeticion, idEquipo, aceptado} = responderInscripcionSchema.parse(data);

  const equipo = await Equipo.findById(idEquipo);

  if (!equipo) {
    throw new Error("No se encontró el equipo en la base de datos");
  }

  await CompeticionesService.responderInscripcion(
    idCompeticion,
    equipo.id,
    aceptado
  );

  const response: ResponderInscripcionResponse = {
    success: true,
  };
  return response;
}
