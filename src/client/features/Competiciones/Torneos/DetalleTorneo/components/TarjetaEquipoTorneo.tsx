"use client";

import { UserClient } from "@/client/shared/client/UserClient";
import { ChipPosicionJugador } from "@/client/shared/components/ChipPosicionJugador";
import { useGetLoggedInUserClient } from "@/client/shared/hooks/useGetLoggedInUserClient";
import { EquipoConEstadoDTO } from "futbol-in-core/types";
import { UserDTO } from "futbol-in-core/types";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BotonesAceptarInscripcion } from "./BotonesAceptarInscripcion";

export const TarjetaEquipoTorneo = ({
  equipo,
  isOwner,
  idCompeticion,
}: {
  equipo: EquipoConEstadoDTO;
  isOwner: boolean;
  idCompeticion: string;
}) => {

  return (
    <div className="flex flex-col w-full border border-neutral-800 rounded-lg p-2">
      <div className="flex items-center  w-full gap-4 relative">
        
        <p className="w-32">{equipo.nombreEquipo}</p>
        <div className="flex flex-col w-full gap-1">
          {equipo.jugadores[0].usuario !== null ? (
            <TarjetaJugadorTorneo
              idJugador={equipo.jugadores[0].usuario}
              nombre={equipo.jugadores[0].nombre}
            />
          ) : (
            <p className="p-1 border rounded-lg bg-neutral-900 border-neutral-800 text-sm font-semibold text-neutral-200">{equipo.jugadores[0].nombre}</p>
          )}

          {equipo.jugadores[1].usuario !== null ? (
            <TarjetaJugadorTorneo
              idJugador={equipo.jugadores[1].usuario}
              nombre={equipo.jugadores[1].nombre}
            />
          ) : (
            <p className="p-1 border rounded-lg bg-neutral-900 border-neutral-800 text-sm font-semibold text-neutral-200">{equipo.jugadores[1].nombre}</p>
          )}
        </div>
      </div>
      {isOwner && (
        <BotonesAceptarInscripcion
          estadoEquipo={equipo.estado}
          idCompeticion={idCompeticion}
          idEquipo={equipo.id}
        />
      )}
    </div>
  );
};

export const TarjetaJugadorTorneo = ({
  idJugador,
  nombre,
}: {
  idJugador: string;
  nombre: string;
}) => {
  const loggedInUser = useGetLoggedInUserClient();
  const isSelf = idJugador === loggedInUser?.id;

  const [fullUser, setFullUser] = useState<UserDTO | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { user } = await UserClient.getUserById(idJugador);
      setFullUser(user);
    };
    getUser();
  }, [idJugador]);

  return (
    <div
      className={`flex items-center justify-between gap-2 border ${
        isSelf
          ? "bg-neutral-800 border-primary/50"
          : "bg-neutral-900 border-neutral-800"
      }  w-full rounded-lg p-1`}
    >
      <span className="flex items-center gap-2 text-sm">
        <p
          className={` ${
            isSelf ? "text-primary" : "text-neutral-200"
          } font-semibold`}
        >
          {nombre.toLowerCase()}
        </p>
        <p
          className={` text-xs ${isSelf ? "text-primary" : "text-neutral-500"}`}
        >
          {fullUser?.name || nombre}
        </p>
      </span>
      <span className="flex items-center gap-2">
        <ChipPosicionJugador posicion={fullUser?.posicion} hideLabel />
        <Link
          href={`/user/${nombre}`}
          className={`${isSelf ? "text-primary" : "text-neutral-500"}`}
        >
          <FontAwesomeIcon icon={faUser} width={20} height={20} />
        </Link>
      </span>
    </div>
  );
};
