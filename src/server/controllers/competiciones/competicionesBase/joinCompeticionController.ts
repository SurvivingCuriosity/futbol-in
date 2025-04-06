import { JoinCompeticionRequest, JoinCompeticionResponse } from '@/client/shared/client/types/Competiciones/CompeticionesBase/JoinCompeticion';
import { Equipo } from "@/server/models/Equipo/Equipo.model";
import { CompeticioneService } from '@/server/services/Competiciones/CompeticionesService';
import { joinCompeticionSchema } from '@/server/validations/competiciones/competicionesBase/joinLigaValidation';
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

  const updatedCompeticion = await CompeticioneService.join(
    idCompeticion,
    equipo.id
  );

  const response: JoinCompeticionResponse = {
    success: true,
    updatedCompeticion,
  };
  return response;
}
