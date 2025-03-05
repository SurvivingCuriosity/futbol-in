import { LugarDTO } from "@/shared/models/Lugar/LugarDTO";
import {
  faFutbol,
  faLocationDot,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const MainInfo = ({ lugar }: { lugar: LugarDTO }) => {
  return (
    <div className="bg-neutral-950/90 w-fit p-2 z-2 rounded-lg">
      <div className="flex items-baseline gap-1 text-primary">
        <FontAwesomeIcon className="w-4" icon={faFutbol} />
        <p className="text-lg font-bold">{lugar.tipoFutbolin}</p>
      </div>

      <div className="flex items-center gap-1 text-neutral-400 text-sm">
        <FontAwesomeIcon className="w-4" icon={faStore} />
        <p className="whitespace-nowrap truncate max-w-10/12">{lugar.nombre}</p>
      </div>
      <div className="flex items-center gap-1 text-neutral-400 text-sm">
        <FontAwesomeIcon className="w-4" icon={faLocationDot} />
        <p className="">{lugar.direccion}</p>
      </div>
    </div>
  );
};
