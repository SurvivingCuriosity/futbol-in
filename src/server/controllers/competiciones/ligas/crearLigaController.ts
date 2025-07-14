import { CrearLigaRequest, CrearLigaResponse } from "@/client/shared/client/types/Competiciones/Ligas/CrearLiga";
import { EstadoCompeticion } from "futbol-in-core/enum";
import { puedeCrearTorneos } from "futbol-in-core/helpers";
import { LigaDTO } from "futbol-in-core/types";
import { LigasService } from "@/server/services/Competiciones/Ligas/LigasService";
import { UserService } from "@/server/services/User/UserService";
import { crearLigaSchema } from "@/server/validations/competiciones/ligas/agregarLigaValidation";
import { validateLoggedInUser } from "@/server/validations/shared/validateLoggedInUser";

export async function crearLigaController(
  data: CrearLigaRequest
): Promise<CrearLigaResponse> {

  const userDb = await validateLoggedInUser();
  
  if (!puedeCrearTorneos(UserService.mapToDTO(userDb))) {
    throw new Error("No tienes permisos para editar esta competición");
  }
  
  const liga = crearLigaSchema.parse(data);

  const competicionACrear: Omit<LigaDTO, "id"> = {
    ...liga,
    createdByUserId: userDb.id,
    estadoCompeticion: EstadoCompeticion.ACTIVO,
  };

  const createdLiga = await LigasService.crearLiga(
    competicionACrear
  );

  const response: CrearLigaResponse = {
    success: true,
    liga: createdLiga,
  };
  return response;
}
