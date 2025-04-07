import { JoinLigaRequest, JoinLigaResponse } from '@/client/shared/client/types/Competiciones/Ligas/JoinLiga';
import { Equipo } from "@/server/models/Equipo/Equipo.model";
import { LigasService } from '@/server/services/Competiciones/Ligas/LigasService';
import { joinLigaSchema } from '@/server/validations/competiciones/ligas/joinLigaValidation';
import { validateLoggedInUser } from "@/server/validations/shared/validateLoggedInUser";


export async function joinLigaController(
  data: JoinLigaRequest
): Promise<JoinLigaResponse> {
  await validateLoggedInUser();

  const { idLiga, idEquipo } = joinLigaSchema.parse(data);

  const equipo = await Equipo.findById(idEquipo);

  if (!equipo) {
    throw new Error("No se encontró el equipo en la base de datos");
  }

  const updatedLiga = await LigasService.join(
    idLiga,
    equipo.id
  );

  const response: JoinLigaResponse = {
    success: true,
    updatedLiga,
  };
  return response;
}
