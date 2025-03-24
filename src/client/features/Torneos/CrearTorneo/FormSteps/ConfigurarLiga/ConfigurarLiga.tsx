import React, { useState } from "react";
import { ConfigEnfrentamiento } from "../Enfrentamientos/FormEnfrentamientos";
import { InputPartidosPorEnfrentamiento } from "../Enfrentamientos/InputPartidosPorEnfrentamiento";
import { InputGolesParaGanar } from "../Enfrentamientos/InputGolesParaGanar";
import { TipoEnfrentamiento } from "@/core/enum/Competicion/TipoEnfrentamiento";
import { InlinePicker } from "futbol-in-ui";
import { TarjetaMensaje } from "@/client/shared/components/TarjetaMensaje";
import { FormField, FormLabel } from "@/packages/components/FormField";

export const ConfigurarLiga = () => {
  const [tipoEnfrentamiento, setTipoEnfrentamiento] =
    useState<TipoEnfrentamiento>(TipoEnfrentamiento.AL_MEJOR_DE);

  const [enfrentamientos, setEnfrentamientos] = useState<ConfigEnfrentamiento>({
    cantidadPartidos: 4,
    golesParaGanar: 10,
  });

  const opcionesTipoEnfrentamiento = [
    { id: 0, label: TipoEnfrentamiento.AL_MEJOR_DE },
    { id: 1, label: TipoEnfrentamiento.JUGAR_UN_TOTAL_DE },
  ];

  const textoAlMejorDe = `Se juega al mejor de ${enfrentamientos.cantidadPartidos} partidos. No hay posibilidad de empate. 3 puntos por ganar el enfrentamiento. El perdedor recibe 1 punto si gana un partido.`;
  const textoJugarUnTotalDe = `Se juega un total de ${enfrentamientos.cantidadPartidos} partidos. Se gana un punto por partido ganado.`;

  return (
    <>
      <FormField>
        <FormLabel>Tipo de enfrentamientos: </FormLabel>
        <InlinePicker
          onTabClick={(id) =>
            setTipoEnfrentamiento(opcionesTipoEnfrentamiento[id].label)
          }
          options={opcionesTipoEnfrentamiento}
        />
      </FormField>
      <FormField>
        <FormLabel>Enfrentamientos por ronda: </FormLabel>
        <InputPartidosPorEnfrentamiento
          label={
            tipoEnfrentamiento === TipoEnfrentamiento.AL_MEJOR_DE
              ? "Al mejor de"
              : "Jugar un total de"
          }
          value={enfrentamientos.cantidadPartidos}
          onUpdateValue={(v) =>
            setEnfrentamientos((prev) => ({ ...prev, cantidadPartidos: v }))
          }
        />
        <InputGolesParaGanar
          value={enfrentamientos.golesParaGanar}
          onUpdateValue={(v) =>
            setEnfrentamientos((prev) => ({ ...prev, golesParaGanar: v }))
          }
        />
      </FormField>
      <TarjetaMensaje
        text={
          tipoEnfrentamiento === TipoEnfrentamiento.AL_MEJOR_DE
            ? textoAlMejorDe
            : textoJugarUnTotalDe
        }
        variant="info"
      />
    </>
  );
};
