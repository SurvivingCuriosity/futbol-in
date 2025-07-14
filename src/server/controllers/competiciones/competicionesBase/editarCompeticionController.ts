import { EditarCompeticionRequest, EditarCompeticionResponse } from "@/client/shared/client/types/Competiciones/CompeticionesBase/EditarCompeticion";
import { puedeCrearTorneos } from "futbol-in-core/helpers";
import { LigaDTO } from "futbol-in-core/types";
import { LigasService } from "@/server/services/Competiciones/Ligas/LigasService";
import { UserService } from "@/server/services/User/UserService";
import { editarLigaSchema } from "@/server/validations/competiciones/ligas/editarLigaValidation";
import { validateLoggedInUser } from "@/server/validations/shared/validateLoggedInUser";

export async function editarCompeticionController(
  data: EditarCompeticionRequest
): Promise<EditarCompeticionResponse> {
  const userDb = await validateLoggedInUser();

  if (!puedeCrearTorneos(UserService.mapToDTO(userDb))) {
    throw new Error("No tienes permisos para editar esta competición");
  }

  const validated = editarLigaSchema.parse(data) as {
    idCompeticion: string;
    data: Partial<LigaDTO>;
  };

  const updatedCompeticion = await LigasService.actualizarLiga(
    validated.idCompeticion,
    validated.data
  );

  const response: EditarCompeticionResponse = {
    success: true,
    updatedCompeticion,
  };
  return response;
}
