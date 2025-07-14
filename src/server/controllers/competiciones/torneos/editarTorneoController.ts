import { EditarTorneoRequest, EditarTorneoResponse } from "@/client/shared/client/types/Competiciones/Torneos/EditarTorneo";
import { puedeCrearTorneos } from "futbol-in-core/helpers";
import { TorneoDTO } from "futbol-in-core/types";
import { TorneosService } from "@/server/services/Competiciones/Torneos/TorneosService";
import { UserService } from "@/server/services/User/UserService";
import { actualizarTorneoSchema } from "@/server/validations/competiciones/torneos/editarTorneoValidation";
import { validateLoggedInUser } from "@/server/validations/shared/validateLoggedInUser";


export async function editarTorneoController(
  data: EditarTorneoRequest
): Promise<EditarTorneoResponse> {
  const userDb = await validateLoggedInUser();

  if (!puedeCrearTorneos(UserService.mapToDTO(userDb))) {
    throw new Error("No tienes permisos para editar esta competición");
  }

  const validated = actualizarTorneoSchema.parse(data) as {
    idCompeticion: string;
    data: Partial<TorneoDTO>;
  };

  const updatedTorneo = await TorneosService.actualizarTorneo(
    validated.idCompeticion,
    validated.data
  );

  const response: EditarTorneoResponse = {
    success: true,
    updatedTorneo,
  };
  return response;
}
