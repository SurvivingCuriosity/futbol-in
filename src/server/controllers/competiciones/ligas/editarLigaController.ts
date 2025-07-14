import {
  EditarLigaRequest,
  EditarLigaResponse,
} from "@/client/shared/client/types/Competiciones/Ligas/EditarLiga";
import { puedeCrearTorneos } from "futbol-in-core/helpers";
import { LigaDTO } from "futbol-in-core/types";
import { LigasService } from "@/server/services/Competiciones/Ligas/LigasService";
import { UserService } from "@/server/services/User/UserService";
import { editarLigaSchema } from "@/server/validations/competiciones/ligas/editarLigaValidation";
import { validateLoggedInUser } from "@/server/validations/shared/validateLoggedInUser";

export async function editarLigaController(
  data: EditarLigaRequest
): Promise<EditarLigaResponse> {
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

  const response: EditarLigaResponse = {
    success: true,
    updatedCompeticion,
  };
  return response;
}
