import { Button } from "futbol-in-ui";
import { useState } from "react";
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

  const getTextoEnfrentamientos = () => {
    const { cantidadPartidos, golesParaGanar } = configuracion;
    const jugara = cantidadPartidos === 1 ? "jugará" : "jugarán";
    const partido = cantidadPartidos === 1 ? "partido" : "partidos";
    return `Se ${jugara} ${cantidadPartidos} ${partido} en cada enfrentamiento. El partido se gana al llegar a ${golesParaGanar} goles`;
  };

  const getTextoEnfrentamientosSemifinal = () => {
    if (!excepcionSemiFinales || !configuracion.excepcionSemiFinales) {
      return "";
    }
    const { cantidadPartidos, golesParaGanar } =
      configuracion.excepcionSemiFinales;
    const jugara = cantidadPartidos === 1 ? "jugará" : "jugarán";
    const partido = cantidadPartidos === 1 ? "partido" : "partidos";
    return `En semifinales se ${jugara} ${cantidadPartidos} ${partido} en cada enfrentamiento. El partido se gana al llegar a ${golesParaGanar} goles`;
  };

  const getTextoEnfrentamientosFinal = () => {
    if (!excepcionFinal || !configuracion.excepcionFinal) {
      return "";
    }
    const { cantidadPartidos, golesParaGanar } = configuracion.excepcionFinal;
    const jugara = cantidadPartidos === 1 ? "jugará" : "jugarán";
    const partido = cantidadPartidos === 1 ? "partido" : "partidos";
    return `En la final se ${jugara} ${cantidadPartidos} ${partido}. El partido se gana al llegar a ${golesParaGanar} goles`;
  };

  return (
    <div className="px-1 md:px-4 md:mt-4 lg:mt-8 overflow-y-auto h-[500px] pr-2">
      <InputPartidosPorEnfrentamiento
        value={configuracion.cantidadPartidos}
        onUpdateValue={(v) => updateField("cantidadPartidos", v)}
      />

      {excepcionSemiFinales && (
        <div className="">
          <InputPartidosPorEnfrentamiento
            label="Semifinal:"
            value={configuracion.cantidadPartidos}
            onUpdateValue={(v) =>
              setConfiguracion((prev) => ({
                ...prev,
                excepcionSemiFinales: {
                  cantidadPartidos: v,
                  golesParaGanar:
                    prev.excepcionSemiFinales?.cantidadPartidos ||
                    DEFAULT_GOLES_PARA_GANAR,
                },
              }))
            }
            inline
          />
        </div>
      )}

      {excepcionFinal && (
        <div className="">
          <InputPartidosPorEnfrentamiento
            label="Final:"
            value={configuracion.cantidadPartidos}
            onUpdateValue={(v) =>
              setConfiguracion((prev) => ({
                ...prev,
                excepcionFinal: {
                  cantidadPartidos: v,
                  golesParaGanar:
                    prev.excepcionFinal?.cantidadPartidos ||
                    DEFAULT_GOLES_PARA_GANAR,
                },
              }))
            }
            inline
          />
        </div>
      )}

      <hr className="my-4 border-neutral-700" />

      <InputGolesParaGanar
        value={configuracion.golesParaGanar}
        onUpdateValue={(v) => updateField("golesParaGanar", v)}
      />

      {excepcionSemiFinales && (
        <div className="">
          <InputGolesParaGanar
            label="Semifinal:"
            value={configuracion.golesParaGanar}
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
            inline
          />
        </div>
      )}

      {excepcionFinal && (
        <div className="">
          <InputGolesParaGanar
            label="Final:"
            value={configuracion.golesParaGanar}
            onUpdateValue={(v) =>
              setConfiguracion((prev) => ({
                ...prev,
                excepcionFinal: {
                  golesParaGanar: v,
                  cantidadPartidos:
                    prev.excepcionSemiFinales?.cantidadPartidos ||
                    DEFAULT_PARTIDOS_POR_ENFRENTAMIENTO,
                },
              }))
            }
            inline
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
        {getTextoEnfrentamientos()}
      </p>
      <p className="mb-4 text-xs text-neutral-600">
        {getTextoEnfrentamientosSemifinal()}
      </p>
      <p className="mb-4 text-xs text-neutral-600">
        {getTextoEnfrentamientosFinal()}
      </p>

      <Button label="Siguiente" onClick={handleSiguiente} />
    </div>
  );
};
