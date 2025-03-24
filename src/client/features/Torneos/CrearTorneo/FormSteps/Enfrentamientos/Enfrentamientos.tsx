import { Button } from "futbol-in-ui";
import { useState } from "react";
import {
  getTextoEnfrentamientos,
  getTextoEnfrentamientosFinal,
  getTextoEnfrentamientosSemifinal,
} from "../../utils/getTextoEnfrentamientos";
import { InputGolesParaGanar } from "./InputGolesParaGanar";
import { InputPartidosPorEnfrentamiento } from "./InputPartidosPorEnfrentamiento";

const DEFAULT_PARTIDOS_POR_ENFRENTAMIENTO = 1;
const DEFAULT_GOLES_PARA_GANAR = 10;

export interface ConfigCompeticion extends ConfigEnfrentamiento {
  excepcionSemiFinales: null | ConfigEnfrentamiento;
  excepcionFinal: null | ConfigEnfrentamiento;
}

export interface ConfigEnfrentamiento {
  cantidadPartidos: number;
  golesParaGanar: number;
}

export const Enfrentamientos = ({
  onCompleted,
}: {
  onCompleted: (datos: unknown) => void;
}) => {
  const [configuracion, setConfiguracion] = useState<ConfigCompeticion>({
    cantidadPartidos: DEFAULT_PARTIDOS_POR_ENFRENTAMIENTO,
    golesParaGanar: DEFAULT_GOLES_PARA_GANAR,
    excepcionSemiFinales: null,
    excepcionFinal: null,
  });

  const [excepcionSemiFinales, setExcepcionSemiFinales] = useState(false);
  const [excepcionFinal, setExcepcionFinal] = useState(false);

  const updateField = (field: keyof typeof configuracion, value: number) => {
    setConfiguracion((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSiguiente = () => {
    onCompleted(configuracion);
  };

  return (
    <div className="px-1 md:px-4 md:mt-4 lg:mt-8 overflow-y-auto h-[500px] pr-2">
      <p className="text-primary">Enfrentamientos por ronda:</p>
      <InputPartidosPorEnfrentamiento
        value={configuracion.cantidadPartidos}
        onUpdateValue={(v) => updateField("cantidadPartidos", v)}
      />
      <InputGolesParaGanar
        value={configuracion.golesParaGanar}
        onUpdateValue={(v) => updateField("golesParaGanar", v)}
      />
      {excepcionSemiFinales && (
        <div className="">
          <hr className="my-4 border-neutral-700" />
          <p className="text-primary">En semifinales:</p>
          <InputPartidosPorEnfrentamiento
            value={configuracion.excepcionSemiFinales?.cantidadPartidos || 1}
            onUpdateValue={(v) =>
              setConfiguracion((prev) => ({
                ...prev,
                excepcionSemiFinales: {
                  ...prev.excepcionSemiFinales,
                  cantidadPartidos: v,
                  // Mantener el golesParaGanar que ya tenía antes
                  golesParaGanar:
                    prev.excepcionSemiFinales?.golesParaGanar ||
                    DEFAULT_GOLES_PARA_GANAR,
                },
              }))
            }
          />
          <InputGolesParaGanar
            value={configuracion.excepcionSemiFinales?.golesParaGanar || 1}
            onUpdateValue={(v) =>
              setConfiguracion((prev) => ({
                ...prev,
                excepcionSemiFinales: {
                  golesParaGanar: v,
                  cantidadPartidos:
                    prev.excepcionSemiFinales?.cantidadPartidos ||
                    DEFAULT_PARTIDOS_POR_ENFRENTAMIENTO,
                },
              }))
            }
          />
        </div>
      )}
      {excepcionFinal && (
        <div className="">
          <hr className="my-4 border-neutral-700" />
          <p className="text-primary">En la final:</p>
          <InputPartidosPorEnfrentamiento
            value={configuracion.excepcionFinal?.cantidadPartidos || 1}
            onUpdateValue={(v) =>
              setConfiguracion((prev) => ({
                ...prev,
                excepcionFinal: {
                  ...prev.excepcionFinal,
                  cantidadPartidos: v,
                  // Mantener el golesParaGanar que ya tenía antes
                  golesParaGanar:
                    prev.excepcionFinal?.golesParaGanar ||
                    DEFAULT_GOLES_PARA_GANAR,
                },
              }))
            }
          />
          <InputGolesParaGanar
            value={configuracion.excepcionFinal?.golesParaGanar || 1}
            onUpdateValue={(v) =>
              setConfiguracion((prev) => ({
                ...prev,
                excepcionFinal: {
                  ...prev.excepcionFinal,
                  golesParaGanar: v,
                  cantidadPartidos:
                    prev.excepcionFinal?.cantidadPartidos ||
                    DEFAULT_PARTIDOS_POR_ENFRENTAMIENTO,
                },
              }))
            }
          />
        </div>
      )}

      <hr className="my-4 border-neutral-700" />

      <div className="my-3 space-y-1">
        <label className="flex items-center text-neutral-400">
          <input
            type="checkbox"
            className="mr-2 size-5 accent-primary"
            checked={excepcionSemiFinales}
            onChange={(e) => {
              setExcepcionSemiFinales(e.target.checked);
              setConfiguracion((prev) => ({
                ...prev,
                excepcionSemiFinales: e.target.checked
                  ? {
                      cantidadPartidos: DEFAULT_PARTIDOS_POR_ENFRENTAMIENTO,
                      golesParaGanar: DEFAULT_GOLES_PARA_GANAR,
                    }
                  : null,
              }));
            }}
          />
          Excepción para semi-finales
        </label>

        <label className="flex items-center text-neutral-400">
          <input
            type="checkbox"
            className="mr-2 size-5 accent-primary"
            checked={excepcionFinal}
            onChange={(e) => {
              setExcepcionFinal(e.target.checked);
              setConfiguracion((prev) => ({
                ...prev,
                excepcionFinal: e.target.checked
                  ? {
                      cantidadPartidos: DEFAULT_PARTIDOS_POR_ENFRENTAMIENTO,
                      golesParaGanar: DEFAULT_GOLES_PARA_GANAR,
                    }
                  : null,
              }));
            }}
          />
          Excepción para la final
        </label>
      </div>

      <p className="mb-4 text-xs text-neutral-600">
        {getTextoEnfrentamientos(configuracion)}
      </p>
      <p className="mb-4 text-xs text-neutral-600">
        {getTextoEnfrentamientosSemifinal(excepcionSemiFinales, configuracion)}
      </p>
      <p className="mb-4 text-xs text-neutral-600">
        {getTextoEnfrentamientosFinal(excepcionFinal, configuracion)}
      </p>

      <Button label="Siguiente" onClick={handleSiguiente} />
    </div>
  );
};
