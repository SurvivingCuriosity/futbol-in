import { ChipPosicionJugador } from "@/client/shared/components/ChipPosicionJugador";
import { EquipoDTO } from "@/server/models/Equipo/EquipoDTO";
import { IUserDocument } from "@/server/models/User/User.model";
import { UserService } from "@/server/services/User/UserService";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export const TarjetaEquipoTorneo = async ({
  equipo,
}: {
  equipo: EquipoDTO;
}) => {
  const jugadorUsuario1 = await UserService.findById(
    equipo.jugadores[0].usuario ?? ""
  );
  const jugadorUsuario2 = await UserService.findById(
    equipo.jugadores[1].usuario ?? ""
  );

  console.log(jugadorUsuario1);

  return (
    <div className="flex items-center border border-neutral-800 w-full rounded-lg p-2 gap-4">
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
  );
};

export const TarjetaJugadorTorneo = async ({
  jugador,
}: {
  jugador: IUserDocument;
}) => {
  const j = await UserService.mapToDTO(jugador);
  return (
    <div className="flex items-center justify-between gap-2 border bg-neutral-900 border-neutral-800 w-full rounded-lg p-2">
        <span className="flex items-center gap-2">
          <p className="text-neutral-200 font-bold">{j.name.toLowerCase()}</p>
          <p className="text-neutral-500 text-xs">{j.nombre}</p>
        </span>
      <span className="flex items-center gap-2">
        <ChipPosicionJugador posicion={j.posicion} hideLabel/>
        <Link href={`/user/${jugador.name}`} className="text-neutral-500">
          <FontAwesomeIcon icon={faUser} width={20} height={20} />
        </Link>
      </span>
    </div>
  );
};
