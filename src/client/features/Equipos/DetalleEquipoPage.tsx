"use client";

import { useGetLoggedInUserClient } from "@/client/shared/hooks/useGetLoggedInUserClient";
import { GoBackLayout } from "@/client/shared/layouts/GoBackLayout";
import { EquipoDTO } from "@/server/models/Equipo/EquipoDTO";
import { UserDTO } from "@/server/models/User/UserDTO";
import Image from "next/image";
import React from "react";
import TarjetaUsuarioRanking from "../Ranking/components/TarjetaUsuarioRanking";

export const DetalleEquipoPage = ({
  equipo,
  creador,
  companero,
}: {
  equipo: EquipoDTO;
  creador: UserDTO;
  companero: UserDTO | null;
}) => {
  const user = useGetLoggedInUserClient();
  const esElCreador = equipo.createdByUserId === user?.id;

  return (
    <GoBackLayout href="/perfil" className="max-w-lg mx-auto">
      <div className="flex items-start gap-4">
        <Image
          src="/default_user.svg"
          alt="Imagen de equipo"
          width={150}
          height={150}
        />
        <div>
          <h1 className="text-6xl font-extrabold text-primary mb-2">
            {equipo.nombreEquipo}
          </h1>
          <div>
            <TarjetaUsuarioRanking user={creador} />
            {companero ? (
              <TarjetaUsuarioRanking user={companero} />
            ) : (
              <p>{equipo.jugadores?.[0].nombre || 'Desconocido'}</p>
            )}
          </div>
        </div>
      </div>
      {esElCreador && <p>Creado por ti</p>}
      <p className="text-neutral-500">{equipo.nombreEquipo}</p>
    </GoBackLayout>
  );
};
