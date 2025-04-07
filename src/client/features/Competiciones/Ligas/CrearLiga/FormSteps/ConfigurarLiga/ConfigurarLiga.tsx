import React, { useState } from "react";
import { ConfigEnfrentamiento } from "../Enfrentamientos/FormEnfrentamientos";
import { InputPartidosPorEnfrentamiento } from "../Enfrentamientos/InputPartidosPorEnfrentamiento";
import { InputGolesParaGanar } from "../Enfrentamientos/InputGolesParaGanar";
import { TipoEnfrentamiento } from "@/core/enum/Competicion/TipoEnfrentamiento";
import { Button, InlinePicker } from "futbol-in-ui";
import { TarjetaMensaje } from "@/client/shared/components/TarjetaMensaje";
import { FormField, FormLabel } from "@/packages/components/FormField";
import { ConfiguracionLiga } from "../../types/ConfiguracionLiga";

export const ConfigurarLiga = ({
  onCompleted,
}: {
  onCompleted: (c: ConfiguracionLiga) => void;
}) => {
  const [idaYVuelta, setIdaYVuelta] = useState<boolean>(false);

  const [tipoEnfrentamiento, setTipoEnfrentamiento] =
    useState<TipoEnfrentamiento>(TipoEnfrentamiento.AL_MEJOR_DE);

  const [configEnfrentamientos, setConfigEnfrentamientos] = useState<ConfigEnfrentamiento>({
    cantidadPartidos: 4,
    golesParaGanar: 10,
  });

  const opcionesTipoEnfrentamiento = [
    { id: 0, label: TipoEnfrentamiento.AL_MEJOR_DE },
    { id: 1, label: TipoEnfrentamiento.JUGAR_UN_TOTAL_DE },
  ];

  const textoAlMejorDe = `Se juega al mejor de ${configEnfrentamientos.cantidadPartidos} partidos. No hay posibilidad de empate. 3 puntos por ganar el enfrentamiento. El perdedor recibe 1 punto si gana un partido.`;
  const textoJugarUnTotalDe = `Se juega un total de ${configEnfrentamientos.cantidadPartidos} partidos. Se gana un punto por partido ganado.`;

  const handleSubmit = () => {
    const configLiga: ConfiguracionLiga = {
      idaYVuelta,
      tipoEnfrentamiento,
      configEnfrentamiento:configEnfrentamientos,
    };
    onCompleted(configLiga);
  };

  return (
    <>
      <FormField>
        <FormLabel>Ida y vuelta:</FormLabel>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            onChange={() => setIdaYVuelta(!idaYVuelta)}
            className="size-4 accent-primary"
          />
          Jugar ida y vuelta
        </label>
        <TarjetaMensaje
          text="Al activar ida y vuelta, cada enfrentamiento entre dos parejas se disputará dos veces."
          variant="info"
        />
      </FormField>
      <FormField>
        <FormLabel>Tipo de enfrentamientos: </FormLabel>
        <InlinePicker
          onTabClick={(id) =>
            setTipoEnfrentamiento(opcionesTipoEnfrentamiento[id].label)
          }
          options={opcionesTipoEnfrentamiento}
          size="sm"
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
          value={configEnfrentamientos.cantidadPartidos}
          onUpdateValue={(v) =>
            setConfigEnfrentamientos((prev) => ({ ...prev, cantidadPartidos: v }))
          }
        />
        <InputGolesParaGanar
          value={configEnfrentamientos.golesParaGanar}
          onUpdateValue={(v) =>
            setConfigEnfrentamientos((prev) => ({ ...prev, golesParaGanar: v }))
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
      <Button label="Siguiente" onClick={handleSubmit} />
    </>
  );
};
