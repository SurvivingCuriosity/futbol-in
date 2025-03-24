import { CrearCompeticionRequest, CrearCompeticionResponse } from "@/client/shared/client/types/Competiciones/CrearCompeticion";
import { CompeticionDTO } from "@/server/models/Competicion/CompeticionDTO";
import { CompeticionesService } from "@/server/services/Competiciones/CompeticionesService";
import { crearCompeticionSchema } from "@/server/validations/competiciones/agregarCompeticionValidation";
import { validateLoggedInUser } from "@/server/validations/shared/validateLoggedInUser";

export async function crearCompeticionController(
  data: CrearCompeticionRequest
): Promise<CrearCompeticionResponse> {
  // Validar usuario que realiza la peticion
  const userDb = await validateLoggedInUser();

  console.log('Antes de validar:', data)

  // Validar request
  const spot = crearCompeticionSchema.parse(data) as CompeticionDTO;

  // Construir el objeto a crear
  const competicionACrear:CompeticionDTO = {
    ...spot,
    createdByUserId: userDb.id,
  };

  // Crear la
  const createdSpot = await CompeticionesService.crearCompeticion(competicionACrear);

  // Respuesta
  const response: CrearCompeticionResponse = {
    success: true,
    competicion: createdSpot,
  };
  return response;
}
