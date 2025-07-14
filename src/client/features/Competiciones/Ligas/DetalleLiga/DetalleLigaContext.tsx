"use client"

import { LigaDTO } from "futbol-in-core/types";
import { EnfrentamientoDTO } from "futbol-in-core/types";
import { EquipoCompeticionDTO } from "futbol-in-core/types";
import { EquipoConEstadoDTO } from "futbol-in-core/types";
import { createContext } from "react";

export interface DetalleLigaContext {
    liga:LigaDTO
    equipoInscrito: EquipoCompeticionDTO | undefined
    equipos: EquipoConEstadoDTO[],
    enfrentamientos: EnfrentamientoDTO[],
    isOwner: boolean;
    placeDetails: google.maps.places.PlaceResult
}

export const DetalleLigaContext = createContext<DetalleLigaContext>(
  null as unknown as DetalleLigaContext
);

export const DetalleLigaProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: DetalleLigaContext;
}) => {
  return (
    <DetalleLigaContext.Provider value={value}>
      {children}
    </DetalleLigaContext.Provider>
  );
};
