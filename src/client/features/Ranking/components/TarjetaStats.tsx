import {
  faCheck,
  faPlus,
  faThumbsUp,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export type TipoStat = "agregados" | "votados" | "verificados";

export const TarjetaStats = ({
  value,
  kind,
}: {
  value: number;
  kind: TipoStat;
}) => {
  const iconMap: Record<TipoStat, IconDefinition> = {
    agregados: faPlus,
    votados: faThumbsUp,
    verificados: faCheck,
  };

  return (
    <strong className="bg-primary/10 p-1 px-2 rounded-lg w-14 flex items-center justify-between">
      <FontAwesomeIcon icon={iconMap[kind]} className="text-primary mr-1" />
      {value || 0}
    </strong>
  );
};
