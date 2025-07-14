import { UserDTO } from "futbol-in-core/types";
import { getLevel } from "@/server/services/Logros/GetLevel";
import { MedallaIcon } from "./MedallaIcon";
import { LOGROS_DISPONIBLES, textColorClass } from "futbol-in-core/constants";
import { LogrosIconMap } from "@/client/shared/constants/LogrosIconMap";

export const Logros = ({ user }: { user: UserDTO }) => {
  const futbolinesAgregados = user.stats.lugaresAgregados;
  const futbolinesVotados = user.stats.lugaresRevisados;
  const futbolinesVerificados = user.stats.lugaresVerificados;

  return (
    <div className="p-4 bg-neutral-900 rounded-lg space-y-4">
      <p className="text-primary font-bold text-2xl mb-4">Logros:</p>
      <div className="flex flex-row items-center">
        <MedallaIcon
          icon={LogrosIconMap[LOGROS_DISPONIBLES[0].icon]}
          level={getLevel(futbolinesAgregados, LOGROS_DISPONIBLES[0].steps)}
          conseguida={futbolinesAgregados >= LOGROS_DISPONIBLES[0].steps[0]}
          showConseguidaIcon={false}
        />
        <p
          className={`ml-2 ${
            textColorClass[
              getLevel(futbolinesAgregados, LOGROS_DISPONIBLES[0].steps)
            ]
          }`}
        >
          {LOGROS_DISPONIBLES[0].stepDescription(futbolinesAgregados)}
        </p>
      </div>
      <div className="flex flex-row items-center">
        <MedallaIcon
          icon={LogrosIconMap[LOGROS_DISPONIBLES[1].icon]}
          level={getLevel(futbolinesVotados, LOGROS_DISPONIBLES[1].steps)}
          conseguida={futbolinesVotados >= LOGROS_DISPONIBLES[1].steps[1]}
          showConseguidaIcon={false}
        />
        <p
          className={`ml-2 ${
            textColorClass[
              getLevel(futbolinesVotados, LOGROS_DISPONIBLES[1].steps)
            ]
          }`}
        >
          {LOGROS_DISPONIBLES[1].stepDescription(futbolinesVotados)}
        </p>
      </div>
      <div className="flex flex-row items-center">
        <MedallaIcon
          icon={LogrosIconMap[LOGROS_DISPONIBLES[2].icon]}
          level={getLevel(futbolinesVerificados, LOGROS_DISPONIBLES[2].steps)}
          conseguida={futbolinesVerificados >= LOGROS_DISPONIBLES[2].steps[2]}
          showConseguidaIcon={false}
        />
        <p
          className={`ml-2 ${
            textColorClass[
              getLevel(futbolinesVerificados, LOGROS_DISPONIBLES[2].steps)
            ]
          }`}
        >
          {LOGROS_DISPONIBLES[2].stepDescription(futbolinesVerificados)}
        </p>
      </div>
    </div>
  );
};
