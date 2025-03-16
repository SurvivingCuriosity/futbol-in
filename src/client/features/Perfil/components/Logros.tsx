import { LOGROS_DISPONIBLES } from "@/core/constants/LogrosDisponibles";
import { UserDTO } from "@/server/models/User/UserDTO";
import { getLevel } from "@/server/services/Logros/GetLevel";
import { MedallaIcon } from "./MedallaIcon";
import { textColorClass } from "@/core/constants/ColoresMedallas";

export const Logros = ({ user }: { user: UserDTO }) => {
  const futbolinesAgregados = user.stats.lugaresAgregados;

  return (
    <div className="p-3 bg-neutral-900 rounded-lg">
      <p className="text-neutral-500 mb-2">Logros:</p>
      <div className="flex flex-row">
        <MedallaIcon
          icon={LOGROS_DISPONIBLES[0].icon}
          level={getLevel(futbolinesAgregados, LOGROS_DISPONIBLES[0].steps)}
          conseguida={futbolinesAgregados >= LOGROS_DISPONIBLES[0].steps[0]}
          showConseguidaIcon={false}
        />
        <p className={`ml-2 ${textColorClass[getLevel(futbolinesAgregados, LOGROS_DISPONIBLES[0].steps)]}`}>{LOGROS_DISPONIBLES[0].stepDescription(futbolinesAgregados)}</p>
      </div>
    </div>
  );
};
