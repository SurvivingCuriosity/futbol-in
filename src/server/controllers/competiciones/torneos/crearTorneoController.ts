import { CrearTorneoRequest, CrearTorneoResponse } from "@/client/shared/client/types/Competiciones/Torneos/CrearTorneo";
import { EstadoCompeticion } from "@/core/enum/Competicion/EstadoCompeticion";
import { puedeCrearTorneos } from "@/core/helpers/puedeCrearTorneos";
import { TorneoDTO } from "@/server/models/Competicion/Torneos/TorneoDTO";
import { TorneosService } from "@/server/services/Competiciones/Torneos/TorneosService";
import { UserService } from "@/server/services/User/UserService";
import { crearTorneoSchema } from "@/server/validations/competiciones/torneos/agregarTorneoValidation";
import { validateLoggedInUser } from "@/server/validations/shared/validateLoggedInUser";

export async function crearTorneoController(
  data: CrearTorneoRequest
): Promise<CrearTorneoResponse> {
  // Validar usuario que realiza la peticion
  const userDb = await validateLoggedInUser();

  if (!puedeCrearTorneos(UserService.mapToDTO(userDb))) {
    throw new Error("No tienes permisos para editar esta competición");
  }

  // Validar request
  const spot = crearTorneoSchema.parse(data);

  // Construir el objeto a crear
  const competicionACrear: Omit<TorneoDTO, "id"> = {
    ...spot,
    createdByUserId: userDb.id,
    estadoCompeticion: EstadoCompeticion.ACTIVO,
  };

  // Crear la
  const createdSpot = await TorneosService.crearTorneo(
    competicionACrear
  );

  // Respuesta
  const response: CrearTorneoResponse = {
    success: true,
    torneo: createdSpot,
  };
  return response;
}
