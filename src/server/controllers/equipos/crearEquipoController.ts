import {
  CrearEquipoRequest,
  CrearEquipoResponse,
} from "@/client/shared/client/types/Equipos/CrearEquipo";
import { EquipoDTO } from "@/server/models/Equipo/EquipoDTO";
import { EquipoService } from "@/server/services/Equipo/EquipoController";
import { UserService } from "@/server/services/User/UserService";
import { crearEquipoSchema } from "@/server/validations/equipos/crearEquipoValidation";
import { validateLoggedInUser } from "@/server/validations/shared/validateLoggedInUser";

export async function crearEquipoController(
  data: CrearEquipoRequest
): Promise<CrearEquipoResponse> {
  const userDb = await validateLoggedInUser();

  const conIdCreatedBy: Omit<EquipoDTO, "id"> = {
    ...data,
    createdByUserId: userDb.id,
  };

  const equipoACrear = crearEquipoSchema.parse(conIdCreatedBy) as Omit<
    EquipoDTO,
    "id"
  >;

  const equipoCreado = await EquipoService.crearEquipo(equipoACrear);

  await UserService.agregarEquipo(equipoCreado._id, userDb.id);

  const response: CrearEquipoResponse = {
    success: true,
    equipo: EquipoService.mapToDTO(equipoCreado),
  };
  return response;
}
