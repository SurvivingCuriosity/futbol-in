import { useUser } from "@/client/shared/context/UserContext";
import { useGetLoggedInUserClient } from "@/client/shared/hooks/useGetLoggedInUserClient";
import { EquipoDTO } from "@/server/models/Equipo/EquipoDTO";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

export const TarjetaEquipo = ({ equipo }: { equipo: EquipoDTO }) => {

  const user = useGetLoggedInUserClient()
  const {imagenesEquipos} = useUser()

  const companero = equipo.jugadores.find(j => j.usuario !== user?.id)

  return (
    <Link
      href={`/equipos/${equipo.id}`}
      key={equipo.id}
      className="w-40 flex flex-row items-center gap-2 justify-center p-2 border rounded-lg bg-neutral-900 border-neutral-700"
    >
      <Image
        src={imagenesEquipos[equipo.id] || "/default_user.svg"}
        alt="Imagen de equipo"
        width={100}
        height={100}
        className="rounded-full size-14"
      />
      <div className="flex flex-col items-start">
        <p className="text-primary font-bold">{equipo.nombreEquipo}</p>
        {equipo.jugadores && (
          <div className="flex items-center gap-1 text-sm text-neutral-300">
            <FontAwesomeIcon icon={faUser} />
            <p className="">{companero?.nombre || 'Desconocido'}</p>
          </div>
        )}
      </div>
    </Link>
  );
};
