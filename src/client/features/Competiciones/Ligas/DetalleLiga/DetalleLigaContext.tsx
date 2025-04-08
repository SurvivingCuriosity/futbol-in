"use client"

import { LigaDTO } from "@/server/models/Competicion/Ligas/LigaDTO";
import { EnfrentamientoDTO } from "@/server/models/Enfrentamiento/Enfrentamiento.model";
import { EquipoCompeticionDTO } from "@/server/models/Equipo/EquipoCompeticion.model";
import { EquipoConEstadoDTO } from "@/server/models/Equipo/EquipoDTO";
import { createContext } from "react";

export interface DetalleLigaContext {
    liga:LigaDTO
    equipoInscrito: EquipoCompeticionDTO | undefined
    equipos: EquipoConEstadoDTO[],
    enfrentamientos: EnfrentamientoDTO[],
    isOwner: boolean;
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
