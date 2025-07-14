import { LigaDTO } from "futbol-in-core/types";
import {
  faFutbol,
  faGamepad,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { use } from "react";
import { DetalleLigaContext } from "./DetalleLigaContext";
import { BotonArrancarCompeticion } from "../../common/BotonArrancarCompeticion";
import { EstadoCompeticion } from "futbol-in-core/enum";
import Link from "next/link";

export const MainInfoLiga = ({ competicion }: { competicion: LigaDTO }) => {
  const { isOwner, placeDetails } = use(DetalleLigaContext);

  return (
    <>
      <p className="text-neutral-400 p-2 text-sm">{competicion.descripcion}</p>
      <div className="my-2">
        <div className="flex items-center">
          <FontAwesomeIcon width={20} height={20} icon={faLocationDot} />
          <p className="text-neutral-300 text-lg font-bold tracking-tighter">
            {placeDetails.name}
          </p>
        </div>
        <p className="text-neutral-500 text-sm pl-2">{placeDetails.vicinity}</p>
      </div>

      <div className="flex items-center gap-1 p-2">
        <div className="flex items-center gap-1 bg-neutral-800 w-fit p-1 text-xs rounded-md text-neutral-400 border border-neutral-600">
          <FontAwesomeIcon icon={faGamepad} />
          <p className="">{competicion.modalidadDeJuego}</p>
        </div>
        <div className="flex items-center gap-1 bg-neutral-800 w-fit p-1 text-xs rounded-md text-neutral-400 border border-neutral-600">
          <FontAwesomeIcon icon={faFutbol} />
          <p className="">{competicion.tipoDeFutbolin}</p>
        </div>
      </div>
      {isOwner && (
        <BotonArrancarCompeticion
          idCompeticion={competicion.id}
          competicionNoHaArrancado={
            competicion.estadoCompeticion === EstadoCompeticion.ACTIVO
          }
        />
      )}
      {isOwner && (
        <Link href={`/competitivo/ligas/${competicion.id}/editar`}>Editar</Link>
      )}
    </>
  );
};
