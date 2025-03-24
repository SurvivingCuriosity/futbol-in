import { FormField, FormLabel } from "@/packages/components/FormField";
import { useEffect, useState } from "react";
import {
  getTextoEnfrentamientos,
  getTextoEnfrentamientosFinal,
  getTextoEnfrentamientosSemifinal,
} from "../../utils/getTextoEnfrentamientos";
import { InputGolesParaGanar } from "./InputGolesParaGanar";
import { InputPartidosPorEnfrentamiento } from "./InputPartidosPorEnfrentamiento";

const DEFAULT_PARTIDOS_POR_ENFRENTAMIENTO = 1;
const DEFAULT_GOLES_PARA_GANAR = 10;

export interface ConfigEnfrentamientos extends ConfigEnfrentamiento {
  excepcionSemiFinales: null | ConfigEnfrentamiento;
  excepcionFinal: null | ConfigEnfrentamiento;
}

export interface ConfigEnfrentamiento {
  cantidadPartidos: number;
  golesParaGanar: number;
}

export const FormEnfrentamientos = ({
  esTorneo,
  onUpdate,
}: {
  esTorneo: boolean;
  onUpdate: (datos: ConfigEnfrentamientos) => void;
}) => {
  const [configuracion, setConfiguracion] = useState<ConfigEnfrentamientos>({
    cantidadPartidos: DEFAULT_PARTIDOS_POR_ENFRENTAMIENTO,
    golesParaGanar: DEFAULT_GOLES_PARA_GANAR,
    excepcionSemiFinales: null,
    excepcionFinal: null,
  });

  useEffect(() => {
    onUpdate(configuracion);
  }, [configuracion]);

  const [excepcionSemiFinales, setExcepcionSemiFinales] = useState(false);
  const [excepcionFinal, setExcepcionFinal] = useState(false);

  const updateField = (field: keyof typeof configuracion, value: number) => {
    setConfiguracion((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <>
      <FormField>
        <FormLabel>Enfrentamientos por ronda:</FormLabel>
        <InputPartidosPorEnfrentamiento
          value={configuracion.cantidadPartidos}
          onUpdateValue={(v) => updateField("cantidadPartidos", v)}
        />
        <InputGolesParaGanar
          value={configuracion.golesParaGanar}
          onUpdateValue={(v) => updateField("golesParaGanar", v)}
        />
      </FormField>
      {esTorneo && excepcionSemiFinales && (
        <>
          <hr className="my-4 border-neutral-700" />
          <FormField>
            <FormLabel>En semifinales:</FormLabel>
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
          </FormField>
        </>
      )}

      {esTorneo && excepcionFinal && (
        <>
          <hr className="my-4 border-neutral-700" />
          <FormField>
            <FormLabel>En la final:</FormLabel>
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
          </FormField>
        </>
      )}

      <hr className="my-4 border-neutral-700" />

      {esTorneo && (
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
      )}

      <p className="mb-4 text-xs text-neutral-600">
        {getTextoEnfrentamientos(configuracion)}
      </p>
      <p className="mb-4 text-xs text-neutral-600">
        {getTextoEnfrentamientosSemifinal(excepcionSemiFinales, configuracion)}
      </p>
      <p className="mb-4 text-xs text-neutral-600">
        {getTextoEnfrentamientosFinal(excepcionFinal, configuracion)}
      </p>
    </>
  );
};
