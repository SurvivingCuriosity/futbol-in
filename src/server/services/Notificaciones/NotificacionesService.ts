import { EquipoDTO } from "@/server/models/Equipo/EquipoDTO";
import { EquipoService } from "../Equipo/EquipoService";
import { UserService } from "../User/UserService";
import { EstadoJugador } from "@/core/enum/Equipos/EstadoJugador";

export class NotificacionesService {
    
  static async getInvitacionesAEquipos(idUser: string): Promise<EquipoDTO[]> {
    const fullUser = await UserService.findById(idUser);
    if (!fullUser) {
      throw new Error("No se encontró al usuario en la base de datos");
    }
    const equipos = await EquipoService.findManyById(fullUser?.equipos);
    const equiposPendientes = equipos.filter((equipo) => {
      const jugador = equipo.jugadores.find((j) => j.usuario === fullUser.id);
      return jugador?.estado === EstadoJugador.PENDIENTE;
    });
    return equiposPendientes;
  }
}
