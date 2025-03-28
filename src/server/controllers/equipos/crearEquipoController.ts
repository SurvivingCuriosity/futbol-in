import {
  CrearEquipoRequest,
  CrearEquipoResponse,
} from "@/client/shared/client/types/Equipos/CrearEquipo";
import { EstadoJugador } from "@/core/enum/Equipos/EstadoJugador";
import { EquipoDTO } from "@/server/models/Equipo/EquipoDTO";
import { EquipoService } from "@/server/services/Equipo/EquipoService";
import { UserService } from "@/server/services/User/UserService";
import { crearEquipoSchema } from "@/server/validations/equipos/crearEquipoValidation";
import { validateLoggedInUser } from "@/server/validations/shared/validateLoggedInUser";

export async function crearEquipoController(
  data: CrearEquipoRequest
): Promise<CrearEquipoResponse> {
  const userDb = await validateLoggedInUser();

  const jugadoresConEstadoPendiente = data.jugadores.map((j) => ({
    ...j,
    estado: EstadoJugador.PENDIENTE,
  }));
  const jugadorCreador = {
    usuario: userDb.id,
    nombre: userDb.name || "",
    estado: EstadoJugador.ACEPTADO,
  };

  const conIdCreatedBy: Omit<EquipoDTO, "id"> = {
    ...data,
    createdByUserId: userDb.id,
    jugadores: [...jugadoresConEstadoPendiente, jugadorCreador],
  };
  
  const equipoACrear = crearEquipoSchema.parse(conIdCreatedBy) as Omit<
  EquipoDTO,
  "id"
  >;

  const equipoCreado = await EquipoService.crearEquipo(equipoACrear);

  for (const jugador of equipoACrear.jugadores) {
    if (jugador.usuario) {
      await UserService.agregarEquipo(equipoCreado._id, jugador.usuario);
    }
  }

  const response: CrearEquipoResponse = {
    success: true,
    equipo: EquipoService.mapToDTO(equipoCreado),
  };
  return response;
}
