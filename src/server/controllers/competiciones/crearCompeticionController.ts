import {
  CrearCompeticionRequest,
  CrearCompeticionResponse,
} from "@/client/shared/client/types/Competiciones/CrearCompeticion";
import { EstadoCompeticion } from "@/core/enum/Competicion/EstadoCompeticion";
import { puedeCrearTorneos } from "@/core/helpers/puedeCrearTorneos";
import { CompeticionDTO } from "@/server/models/Competicion/CompeticionDTO";
import { CompeticionesService } from "@/server/services/Competiciones/CompeticionesService";
import { UserService } from "@/server/services/User/UserService";
import { crearCompeticionSchema } from "@/server/validations/competiciones/agregarCompeticionValidation";
import { validateLoggedInUser } from "@/server/validations/shared/validateLoggedInUser";

export async function crearCompeticionController(
  data: CrearCompeticionRequest
): Promise<CrearCompeticionResponse> {
  // Validar usuario que realiza la peticion
  const userDb = await validateLoggedInUser();

  if (!puedeCrearTorneos(UserService.mapToDTO(userDb))) {
    throw new Error("No tienes permisos para editar esta competición");
  }

  // Validar request
  const spot = crearCompeticionSchema.parse(data);

  // Construir el objeto a crear
  const competicionACrear: Omit<CompeticionDTO, "id"> = {
    ...spot,
    createdByUserId: userDb.id,
    estadoCompeticion: EstadoCompeticion.ACTIVO,
  };

  // Crear la
  const createdSpot = await CompeticionesService.crearCompeticion(
    competicionACrear
  );

  // Respuesta
  const response: CrearCompeticionResponse = {
    success: true,
    competicion: createdSpot,
  };
  return response;
}
