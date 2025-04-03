import {
  EditarCompeticionRequest,
  EditarCompeticionResponse,
} from "@/client/shared/client/types/Competiciones/EditarCompeticion";
import { puedeCrearTorneos } from "@/core/helpers/puedeCrearTorneos";
import { CompeticionDTO } from "@/server/models/Competicion/CompeticionDTO";
import { CompeticionesService } from "@/server/services/Competiciones/CompeticionesService";
import { actualizarCompeticionSchema } from "@/server/validations/competiciones/editarCompeticionValidation";
import { validateLoggedInUser } from "@/server/validations/shared/validateLoggedInUser";
import { UserService } from "../../services/User/UserService";

export async function editarCompeticionController(
  data: EditarCompeticionRequest
): Promise<EditarCompeticionResponse> {
  const userDb = await validateLoggedInUser();

  if (!puedeCrearTorneos(UserService.mapToDTO(userDb))) {
    throw new Error("No tienes permisos para editar esta competición");
  }

  const validated = actualizarCompeticionSchema.parse(data) as {
    idCompeticion: string;
    data: Partial<CompeticionDTO>;
  };

  const updatedCompeticion = await CompeticionesService.actualizarCompeticion(
    validated.idCompeticion,
    validated.data
  );

  const response: EditarCompeticionResponse = {
    success: true,
    updatedCompeticion,
  };
  return response;
}
