"use client";
import { EnfrentamientoDTO } from "@/server/models/Enfrentamiento/Enfrentamiento.model";
import { EquipoCompeticionDTO } from "@/server/models/Equipo/EquipoCompeticion.model";
import { EquipoConEstadoDTO } from "@/server/models/Equipo/EquipoDTO";
import { PartidosLigaProvider } from "./PartidosLigaContex";
import { TarjetaEnfrentamiento } from "./TarjetaEnfrentamiento";
import { IConfigEnfrentamiento } from "@/server/models/Enfrentamiento/ConfigEnfrentamientos.model";
import { TarjetaMensaje } from "@/client/shared/components/TarjetaMensaje";

export const PartidosLigaPage = ({
  partidos,
  equipos,
  equipoInscrito,
  configEnfrentamiento,
  isOwner
}: {
  partidos: EnfrentamientoDTO[];
  equipos: EquipoConEstadoDTO[];
  equipoInscrito: EquipoCompeticionDTO | undefined;
  configEnfrentamiento: IConfigEnfrentamiento
  isOwner: boolean
}) => {
  return (
    <PartidosLigaProvider
      value={{
        configEnfrentamiento,
        enfrentamientos: partidos,
        equipoInscrito,
        equipos,
        isOwner
      }}
    >
      <TarjetaMensaje 
        text={`Se jugarán ${configEnfrentamiento.cantidadPartidos} partidos a ${configEnfrentamiento.golesParaGanar} goles`}
        variant="info"
      />
      <ul className="space-y-2 mt-2">
        {partidos.map((p) => (
          <TarjetaEnfrentamiento
            key={p.equipoA + p.equipoB}
            enfrentamiento={p}
            equipoA={equipos.find((e) => e.id === p.equipoA)}
            equipoB={equipos.find((e) => e.id === p.equipoB)}
          />
        ))}
      </ul>
    </PartidosLigaProvider>
  );
};
