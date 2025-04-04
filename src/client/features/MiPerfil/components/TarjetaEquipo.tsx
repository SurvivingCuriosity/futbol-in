"use client"

import { useUser } from "@/client/shared/context/UserContext";
import { useGetLoggedInUserClient } from "@/client/shared/hooks/useGetLoggedInUserClient";
import { EquipoDTO } from "@/server/models/Equipo/EquipoDTO";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

export const TarjetaEquipo = ({ equipo, onClick, selected = false }: { equipo: EquipoDTO, onClick?: () => void, selected?:boolean }) => {

  const user = useGetLoggedInUserClient()
  const {imagenesEquipos} = useUser()

  const companero = equipo.jugadores.find(j => j.usuario !== user?.id)

  return (
    <div
      onClick={onClick}
      className={`w-40 flex flex-row items-center gap-2 justify-center p-2 border rounded-lg bg-neutral-900 ${selected ? 'border-primary' : 'border-neutral-700'}`}
    >
      <Image
        src={imagenesEquipos[equipo.id] || "/default_user.svg"}
        alt="Imagen de equipo"
        width={100}
        height={100}
        className="rounded-full size-12"
      />
      <div className="flex flex-col items-start">
        <p className="text-neutral-200">{equipo.nombreEquipo}</p>
        {equipo.jugadores && (
          <div className="flex items-center gap-1 text-xs text-neutral-500">
            <FontAwesomeIcon icon={faUser} />
            <p className="">{companero?.nombre || 'Desconocido'}</p>
          </div>
        )}
      </div>
    </div>
  );
};
