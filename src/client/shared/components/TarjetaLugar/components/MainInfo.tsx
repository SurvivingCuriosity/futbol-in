import { SpotDTO } from "@/server/models/Spot/SpotDTO";
import {
  faFutbol,
  faLocationDot,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const MainInfo = ({ spot }: { spot: SpotDTO }) => {
  return (
    <div className="bg-neutral-950/90 w-fit p-2 z-2 pt-0 rounded-lg">
      <div className="flex items-baseline gap-1 text-primary">
        <FontAwesomeIcon className="w-4" icon={faFutbol} />
        <p className="text-lg font-bold">{spot.tipoFutbolin}</p>
      </div>

      <div className="flex items-center gap-1 text-neutral-400 text-sm">
        <FontAwesomeIcon className="w-4" icon={faStore} />
        <p className="whitespace-nowrap truncate max-w-10/12">{spot.nombre}</p>
      </div>
      <div className="flex items-center gap-1 text-neutral-400 text-sm">
        <FontAwesomeIcon className="w-4" icon={faLocationDot} />
        <p className="">{spot.direccion}</p>
      </div>
    </div>
  );
};
