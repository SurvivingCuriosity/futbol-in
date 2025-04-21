"use client";

import { iconTipoDeCompeticionMap } from "@/client/shared/constants/IconTipoDeCompeticionMap";
import { TipoCompeticion } from "@/core/enum/Competicion/TipoCompeticion";
import { CompeticionBaseDTO } from "@/server/models/Competicion/CompeticionBase/CompeticionBaseDTO";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "futbol-in-ui";
import { useRouter } from "next/navigation";

export const TarjetaCompeticionHome = ({
  competicion,
}: {
  competicion: CompeticionBaseDTO;
}) => {
  const router = useRouter();

  const handleVerCompeticion = () => {
    const href =
      competicion.tipoCompeticion === TipoCompeticion.LIGA
        ? `competitivo/ligas/${competicion.id}?from=/`
        : `competitivo/torneos/${competicion.id}?from=/`;

    router.push(href);
  };

  return (
    <li
      key={competicion.id}
      className="w-11/12 border relative p-2 rounded-lg bg-neutral-900 border-neutral-800 overflow-hidden"
    >
      <p className="font-semibold text-neutral-300">{competicion.nombre}</p>
      <div className="flex items-center gap-2 text-sm text-neutral-400 mb-2">
        <FontAwesomeIcon icon={faLocationDot} />
        <p>{competicion.ciudad}</p>
      </div>
      <Button
        label="Ver"
        onClick={handleVerCompeticion}
        size="sm"
        variant="outline"
      />
      <FontAwesomeIcon
        icon={
          iconTipoDeCompeticionMap[
            competicion.tipoCompeticion || TipoCompeticion.LIGA
          ]
        }
        className="absolute -top-1 -right-1 text-5xl text-neutral-400 opacity-50 -rotate-12"
      />
    </li>
  );
};
