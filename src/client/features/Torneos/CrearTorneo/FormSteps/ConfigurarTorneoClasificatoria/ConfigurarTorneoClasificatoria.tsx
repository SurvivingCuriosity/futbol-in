import { TarjetaMensaje } from "@/client/shared/components/TarjetaMensaje";
import { TipoEnfrentamiento } from "@/core/enum/Competicion/TipoEnfrentamiento";
import { FormField, FormLabel } from "@/packages/components/FormField";
import { Button, InlinePicker } from "futbol-in-ui";
import { useState } from "react";
import { FormCantidadParejas } from "../../components/FormCantidadParejas";
import {
  ConfigEnfrentamiento,
  FormEnfrentamientos,
} from "../Enfrentamientos/FormEnfrentamientos";
import { InputGolesParaGanar } from "../Enfrentamientos/InputGolesParaGanar";
import { InputPartidosPorEnfrentamiento } from "../Enfrentamientos/InputPartidosPorEnfrentamiento";
import { ConfiguracionTorneoClasificatoria } from "../../types/ConfiguracionTorneoClasificatoria";

export const ConfigurarTorneoClasificatoria = ({
  onCompleted,
}: {
  onCompleted: (c:ConfiguracionTorneoClasificatoria) => void;
}) => {
  const [cantidadParejas, setCantidadParejas] = useState<number>(16);

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

  const handleSubmit = () => {
    const configTorneoClasificatoria: ConfiguracionTorneoClasificatoria = {
      cantidadParejas,
      configEnfrentamientosFaseDeGrupos: enfrentamientos,
      configEnfrentamientosTorneo: {
        cantidadPartidos: enfrentamientos.cantidadPartidos,
        golesParaGanar: enfrentamientos.golesParaGanar,
        excepcionSemiFinales: null,
        excepcionFinal: null,
      }
    };

    onCompleted(configTorneoClasificatoria);
  }

  return (
    <>
      <FormCantidadParejas onChange={setCantidadParejas} />
      <TarjetaMensaje
        text={`Se generarán ${
          cantidadParejas / 4
        } grupos de 4 parejas cada uno para la fase de grupos.`}
        variant="info"
      />
      <p className="text-primary font-bold text-lg underline">
        Fase de grupos (clasificatoria)
      </p>
      <FormField>
        <FormLabel>Tipo de enfrentamientos en fase de grupos: </FormLabel>
        <InlinePicker
          onTabClick={(id) =>
            setTipoEnfrentamiento(opcionesTipoEnfrentamiento[id].label)
          }
          options={opcionesTipoEnfrentamiento}
        />
      </FormField>
      <FormField>
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
      <p className="text-primary font-bold text-lg underline">Torneo</p>
      <FormEnfrentamientos esTorneo={true} onUpdate={() => {}} />
        <Button label="Siguiente" onClick={handleSubmit} />
    </>
  );
};
