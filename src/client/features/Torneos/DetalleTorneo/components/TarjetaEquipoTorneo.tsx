import { ChipPosicionJugador } from "@/client/shared/components/ChipPosicionJugador";
import { authOptions } from "@/server/lib/authOptions";
import { EquipoConEstadoDTO } from "@/server/models/Equipo/EquipoDTO";
import { IUserDocument } from "@/server/models/User/User.model";
import { UserService } from "@/server/services/User/UserService";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { BotonesAceptarInscripcion } from "./BotonesAceptarInscripcion";

export const TarjetaEquipoTorneo = async ({
  equipo,
  isOwner,
  idCompeticion
}: {
  equipo: EquipoConEstadoDTO;
  isOwner: boolean;
  idCompeticion: string;
}) => {
  const jugadorUsuario1 = await UserService.findById(
    equipo.jugadores[0].usuario ?? ""
  );
  const jugadorUsuario2 = await UserService.findById(
    equipo.jugadores[1].usuario ?? ""
  );

  return (
    <div className="flex flex-col w-full border border-neutral-800 rounded-lg p-2">
      <div className="flex items-center  w-full  gap-4 relative">
        {equipo.nombreEquipo}
        <div className="flex flex-col w-full gap-1">
          {jugadorUsuario1 ? (
            <TarjetaJugadorTorneo jugador={jugadorUsuario1} />
          ) : (
            <p className="text-neutral-500">{equipo.jugadores[0].nombre}</p>
          )}

          {jugadorUsuario2 ? (
            <TarjetaJugadorTorneo jugador={jugadorUsuario2} />
          ) : (
            <p className="text-neutral-500">{equipo.jugadores[0].nombre}</p>
          )}
        </div>
      </div>
      {isOwner && <BotonesAceptarInscripcion estadoEquipo={equipo.estado} idCompeticion={idCompeticion} idEquipo={equipo.id}/>}
    </div>
  );
};

export const TarjetaJugadorTorneo = async ({
  jugador,
}: {
  jugador: IUserDocument;
}) => {
  const j = await UserService.mapToDTO(jugador);
  const session = await getServerSession(authOptions);
  const isSelf = jugador.id === session?.user?.id;
  return (
    <div className={`flex items-center justify-between gap-2 border ${isSelf ? 'bg-neutral-800 border-primary/50' : 'bg-neutral-900 border-neutral-800'}  w-full rounded-lg p-2 `}>
      <span className="flex items-center gap-2">
        <p
          className={` ${
            isSelf ? "text-primary" : "text-neutral-200"
          } font-bold`}
        >
          {j.name.toLowerCase()}
        </p>
        <p
          className={` text-xs ${isSelf ? "text-primary" : "text-neutral-500"}`}
        >
          {j.nombre}
        </p>
      </span>
      <span className="flex items-center gap-2">
        <ChipPosicionJugador posicion={j.posicion} hideLabel />
        <Link href={`/user/${jugador.name}`} className={`${isSelf ? "text-primary" : "text-neutral-500"}`}>
          <FontAwesomeIcon icon={faUser} width={20} height={20} />
        </Link>
      </span>
    </div>
  );
};
