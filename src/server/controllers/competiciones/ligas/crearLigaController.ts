import { CrearLigaRequest, CrearLigaResponse } from "@/client/shared/client/types/Competiciones/Ligas/CrearLiga";
import { EstadoCompeticion } from "@/core/enum/Competicion/EstadoCompeticion";
import { puedeCrearTorneos } from "@/core/helpers/puedeCrearTorneos";
import { LigaDTO } from "@/server/models/Competicion/Ligas/LigaDTO";
import { LigasService } from "@/server/services/Competiciones/Ligas/LigasService";
import { UserService } from "@/server/services/User/UserService";
import { crearLigaSchema } from "@/server/validations/competiciones/ligas/agregarLigaValidation";
import { validateLoggedInUser } from "@/server/validations/shared/validateLoggedInUser";

export async function crearLigaController(
  data: CrearLigaRequest
): Promise<CrearLigaResponse> {
  // Validar usuario que realiza la peticion
  const userDb = await validateLoggedInUser();

  console.log('En controller')
  
  if (!puedeCrearTorneos(UserService.mapToDTO(userDb))) {
    throw new Error("No tienes permisos para editar esta competición");
  }
  console.log('Tiene eprmiso')
  
  // Validar request
  const liga = crearLigaSchema.parse(data);

  // Construir el objeto a crear
  const competicionACrear: Omit<LigaDTO, "id"> = {
    ...liga,
    createdByUserId: userDb.id,
    estadoCompeticion: EstadoCompeticion.ACTIVO,
  };

  // Crear la
  const createdLiga = await LigasService.crearLiga(
    competicionACrear
  );

  // Respuesta
  const response: CrearLigaResponse = {
    success: true,
    liga: createdLiga,
  };
  return response;
}
