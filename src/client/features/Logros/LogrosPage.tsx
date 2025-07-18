import { LOGROS_DISPONIBLES } from "futbol-in-core/constants";
import { MedallaIcon } from "../MiPerfil/components/MedallaIcon";
import { LogrosIconMap } from "@/client/shared/constants/LogrosIconMap";

export const LogrosPage = () => {

  const LOGROS = Object.values(LOGROS_DISPONIBLES);

  return (
    <div className="w-full">
      <h1 className="text-2xl font-black uppercase text-primary">
        Logros disponibles
      </h1>
      <p className="text-xs py-2 text-neutral-600">
        En esta página puedes ver todos los logros que puedes conseguir.
      </p>
      <ul className="w-full space-y-2 mt-2 gap-2 lg:gap-4 flex flex-col">
        {LOGROS.map((logro) => (
          <li
            key={logro.id}
            className="bg-neutral-900 rounded-xl p-2 lg:p-4 flex flex-col border border-neutral-600 w-full"
          >
            <h2 className="text-lg tracking-tight text-neutral-400">
              {logro.nombre}
            </h2>
            <p className="text-neutral-500 mb-5 text-sm">{logro.descripcion}</p>
            <ul className="flex gap-2 w-full items-center justify-between">
              {logro.steps.map((step, index) => (
                <div key={step} className="w-fit mx-auto flex flex-col items-center">
                  <MedallaIcon
                    level={index + 1}
                    icon={LogrosIconMap[logro.icon]}
                    conseguida={step >= logro.steps[0]}
                    showConseguidaIcon={false}
                  />
                  <p className="text-sm text-neutral-500">{logro.steps[index]}</p>
                </div>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};
