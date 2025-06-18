"use client";

import { useUser } from "@/client/shared/context/UserContext";
import { useGetLoggedInUserClient } from "@/client/shared/hooks/useGetLoggedInUserClient";
import { EquipoDTO } from "@/server/models/Equipo/EquipoDTO";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

export const TarjetaEquipo = ({
  equipo,
  onClick,
  selected = false,
}: {
  equipo: EquipoDTO;
  onClick?: () => void;
  selected?: boolean;
}) => {
  const user = useGetLoggedInUserClient();
  const { imagenesEquipos } = useUser();

  return (
    <div
      onClick={onClick}
      className={`overflow-hidden relative min-w-53 flex flex-row items-center gap-2 justify-start p-2 border rounded-lg bg-neutral-900  ${
        selected ? "border-primary" : "border-neutral-800"
      }`}
    >
      <Image
        src={imagenesEquipos[equipo.id] || "/default_user.svg"}
        alt="Imagen de equipo"
        width={100}
        height={100}
        className="rounded-full size-40 absolute left-0 -bottom-7/12 opacity-10 rotate-12 blur-xs"
      />
      <Image
        src={imagenesEquipos[equipo.id] || "/default_user.svg"}
        alt="Imagen de equipo"
        width={100}
        height={100}
        className="rounded-full size-14"
      />
      <div className="flex flex-col items-start">
        <p className="text-neutral-200">{equipo.nombreEquipo}</p>
        {equipo.jugadores &&
          equipo.jugadores.map((j) => (
            <div
              key={j.usuario}
              className={`flex items-center gap-1 text-xs text-neutral-500 ${j.usuario === user?.id ? "text-primary" : ""}`}
            >
              <FontAwesomeIcon icon={faUser} />
              <p className="">{j?.nombre || "Desconocido"}</p>
            </div>
          ))}
      </div>
    </div>
  );
};
