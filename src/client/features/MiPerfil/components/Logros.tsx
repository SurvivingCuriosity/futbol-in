"use client";

import { LOGROS_DISPONIBLES } from "@/core/constants/LogrosDisponibles";
import { UserDTO } from "@/server/models/User/UserDTO";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";
import { ProgresoLogro } from "./ProgresoLogro";
import { MedallaIcon } from "./MedallaIcon";
import { getLevel } from "@/server/services/Logros/GetLevel";
import { Tooltip } from "@/client/shared/components/Tooltip/Tooltip";

export const Logros = ({ user }: { user: UserDTO }) => {
  const futbolinesAgregados = user.stats.lugaresAgregados;
  const futbolinesVotados = user.stats.lugaresRevisados;
  const futbolinesVerificados = user.stats.lugaresVerificados;

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="grow p-3 bg-neutral-900 rounded-lg">
      <div className="flex items-center justify-between">
        <p className="text-xl text-primary font-bold mb-4">Logros</p>
        <button
          aria-label="Expandir logros"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <FontAwesomeIcon
            icon={faChevronUp}
            className={`text-primary ${
              isExpanded ? "" : "rotate-180"
            } transition-transform duration-200`}
          />
        </button>
      </div>
      {isExpanded ? (
        <div className="space-y-4">
          <ProgresoLogro
            logro={LOGROS_DISPONIBLES[0]}
            value={futbolinesAgregados}
          />
          <ProgresoLogro
            logro={LOGROS_DISPONIBLES[1]}
            value={futbolinesVotados}
          />
          <ProgresoLogro
            logro={LOGROS_DISPONIBLES[2]}
            value={futbolinesVerificados}
          />
        </div>
      ) : (
        <div className="flex gap-4">
          <Tooltip id="medalla" content={LOGROS_DISPONIBLES[0].stepDescription(futbolinesAgregados)}>
            <MedallaIcon
              icon={LOGROS_DISPONIBLES[0].icon}
              level={getLevel(futbolinesAgregados, LOGROS_DISPONIBLES[0].steps)}
              conseguida={futbolinesAgregados >= LOGROS_DISPONIBLES[0].steps[0]}
              showConseguidaIcon={false}
            />
          </Tooltip>
          <Tooltip id="medalla2" content={LOGROS_DISPONIBLES[1].stepDescription(futbolinesVotados)}>
            <MedallaIcon
              icon={LOGROS_DISPONIBLES[1].icon}
              level={getLevel(futbolinesVotados, LOGROS_DISPONIBLES[1].steps)}
              conseguida={futbolinesVotados >= LOGROS_DISPONIBLES[1].steps[0]}
              showConseguidaIcon={false}
            />
          </Tooltip>
          <Tooltip id="medalla3" content={LOGROS_DISPONIBLES[2].stepDescription(futbolinesVerificados)}>
            <MedallaIcon
              icon={LOGROS_DISPONIBLES[2].icon}
              level={getLevel(
                futbolinesVerificados,
                LOGROS_DISPONIBLES[2].steps
              )}
              conseguida={
                futbolinesVerificados >= LOGROS_DISPONIBLES[2].steps[0]
              }
              showConseguidaIcon={false}
            />
          </Tooltip>
        </div>
      )}
      <Link
        href={"/logros"}
        className="text-right block text-sm text-neutral-500 mt-2 underline underline-offset-2"
      >
        Ver todos los logros disponibles
      </Link>
    </div>
  );
};
