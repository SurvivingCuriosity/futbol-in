import { DetalleEquipoPage } from "@/client/features/Equipos/DetalleEquipoPage";
import { EstadoJugador } from "@/core/enum/Equipos/EstadoJugador";
import { UserDTO } from "@/server/models/User/UserDTO";
import { EquipoService } from "@/server/services/Equipo/EquipoService";
import { UserService } from "@/server/services/User/UserService";

interface PageProps {
  params: Promise<{
    idEquipo: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { idEquipo } = await params;

  const equipo = await EquipoService.findById(idEquipo);

  const creador = await UserService.findById(equipo.createdByUserId);

  const jugadoresRegistrados: Array<UserDTO&{estado:EstadoJugador}> = [];
  const jugadoresNoRegistrados: Array<{nombre:string, estado:EstadoJugador}> = [];

  for (const jugadorEquipo of equipo.jugadores) {
    if (jugadorEquipo.usuario) {
      const jugadorDocument = await UserService.findById(jugadorEquipo.usuario);
      if (jugadorDocument) {
        const jugadorDTO = UserService.mapToDTO(jugadorDocument);
        jugadoresRegistrados.push({...jugadorDTO, estado:jugadorEquipo.estado});
      } else {
        jugadoresNoRegistrados.push({nombre:"Desconocido", estado:jugadorEquipo.estado});
      }
    } else {
      jugadoresNoRegistrados.push({nombre:jugadorEquipo.nombre, estado:jugadorEquipo.estado});
    }
  }

  return (
    <DetalleEquipoPage
      equipo={equipo}
      creador={creador ? UserService.mapToDTO(creador) : null}
      jugadoresRegistrados={jugadoresRegistrados}
      jugadoresNoRegistrados={jugadoresNoRegistrados}
    />
  );
}
