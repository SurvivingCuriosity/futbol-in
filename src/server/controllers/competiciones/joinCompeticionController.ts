import { EditarCompeticionResponse } from "@/client/shared/client/types/Competiciones/EditarCompeticion";
import {
  JoinCompeticionRequest,
  JoinCompeticionResponse,
} from "@/client/shared/client/types/Competiciones/JoinCompeticionRequest";
import { Equipo } from "@/server/models/Equipo/Equipo.model";
import { CompeticionesService } from "@/server/services/Competiciones/CompeticionesService";
import { joinCompeticionSchema } from "@/server/validations/competiciones/joinCompeticionValidation";
import { validateLoggedInUser } from "@/server/validations/shared/validateLoggedInUser";

export async function joinCompeticionController(
  data: JoinCompeticionRequest
): Promise<JoinCompeticionResponse> {
  await validateLoggedInUser();

  const { idCompeticion, idEquipo } = joinCompeticionSchema.parse(data);

  const equipo = await Equipo.findById(idEquipo);

  if (!equipo) {
    throw new Error("No se encontró el equipo en la base de datos");
  }

  const updatedCompeticion = await CompeticionesService.joinCompeticion(
    idCompeticion,
    equipo.id
  );

  const response: EditarCompeticionResponse = {
    success: true,
    updatedCompeticion,
  };
  return response;
}
