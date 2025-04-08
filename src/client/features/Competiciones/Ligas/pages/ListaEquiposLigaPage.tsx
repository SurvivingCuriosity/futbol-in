"use client"

import { use } from "react";
import { TarjetaEquipoTorneo } from "../../Torneos/DetalleTorneo/components/TarjetaEquipoTorneo";
import { DetalleLigaContext } from "../DetalleLiga/DetalleLigaContext";

export const ListaEquiposLigaPage = () => {
  
  const {equipos, liga, isOwner} = use(DetalleLigaContext);

  return (
    <>
      {equipos.length === 0 ? (
        <p className="p-4 bg-neutral-900 rounded-lg flex items-center justify-center text-neutral-500">
          No hay participantes
        </p>
      ) : (
        <ul className="w-full space-y-2">
          {equipos.map((e) => (
            <TarjetaEquipoTorneo
              equipo={e}
              key={e.id}
              isOwner={isOwner}
              idCompeticion={liga.id}
            />
          ))}
        </ul>
      )}
    </>
  );
};
