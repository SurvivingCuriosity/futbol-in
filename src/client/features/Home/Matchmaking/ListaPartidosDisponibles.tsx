import { dateToTimeAgo } from "@/packages/utils/dateToTimeAgo";
import { Button } from "futbol-in-ui";
import React from "react";

export interface IPartidoDisponible {
  id: number;
  fecha: Date;
  usuario: string;
}

export const ListaPartidosDisponibles = () => {
  const mockPartidosDisponibles: IPartidoDisponible[] = [
    {
      id: 1,
      fecha: new Date(),
      usuario: "@juanperez",
    },
  ];

  return (
    <div className="">
      <p className="text-neutral-400 mb-2">Partidos disponibles</p>
      <ul>
        {mockPartidosDisponibles.map((partido) => (
          <TarjetaPartidoDisponible key={partido.id} partido={partido} />
        ))}
      </ul>
    </div>
  );
};

export const TarjetaPartidoDisponible = ({
  partido,
}: {
  partido: IPartidoDisponible;
}) => {
  return (
    <div className="flex items-center gap-2 px-4">
      <div className="flex flex-col gap-0.5 w-full">
        <p className="text-neutral-300 text-sm">{partido.usuario}</p>
        <p className="text-neutral-500 text-xs w-full">
          {dateToTimeAgo(partido.fecha)}
        </p>
      </div>
      <Button
        label="Unirme"
        size="sm"
        variant="neutral-outline"
        loading={false}
      />
    </div>
  );
};
