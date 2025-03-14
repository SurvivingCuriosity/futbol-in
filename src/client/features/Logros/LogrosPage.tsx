import { LOGROS_DISPONIBLES } from "@/core/constants/LogrosDisponibles";
import { Medalla } from "./Medalla";

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
                <div key={step} className="w-full">
                  <Medalla
                    level={index + 1}
                    icon={logro.icon}
                    text={logro.stepDescription(step)}
                    smallText={step.toString()}
                  />
                </div>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};
