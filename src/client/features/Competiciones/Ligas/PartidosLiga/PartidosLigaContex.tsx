import { IConfigEnfrentamiento } from "@/server/models/Enfrentamiento/ConfigEnfrentamientos.model";
import { EnfrentamientoDTO } from "@/server/models/Enfrentamiento/Enfrentamiento.model";
import { EquipoCompeticionDTO } from "@/server/models/Equipo/EquipoCompeticion.model";
import { EquipoConEstadoDTO } from "@/server/models/Equipo/EquipoDTO";
import { createContext } from "react";

export interface PartidosLigaContext {
  configEnfrentamiento: IConfigEnfrentamiento;
  enfrentamientos: EnfrentamientoDTO[];
  equipos: EquipoConEstadoDTO[];
  equipoInscrito: EquipoCompeticionDTO | undefined;
  isOwner: boolean;
}

export const PartidosLigaContext = createContext<PartidosLigaContext>(
  null as unknown as PartidosLigaContext
);

export const PartidosLigaProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: PartidosLigaContext;
}) => {
  return (
    <PartidosLigaContext.Provider value={value}>
      {children}
    </PartidosLigaContext.Provider>
  );
};
