import { CompeticionDTO } from "@/server/models/Competicion/CompeticionDTO";
import {
  faFutbol,
  faGamepad,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { ChipEstadoCompeticion } from "./ChipEstadoCompeticion";
import { ChipInscripcion } from "./ChipInscripcion";
import { EstadoCompeticion } from "@/core/enum/Competicion/EstadoCompeticion";
import { TipoInscripcion } from "@/core/enum/Competicion/TipoInscripcion";
import { BotonInscribirme } from "../DetalleTorneo/components/BotonInscribirme";

export const TarjetaCompeticion = ({
  competicion,
}: {
  competicion: CompeticionDTO;
}) => {
  const puedeApuntarse =
    competicion.estadoCompeticion === EstadoCompeticion.ACTIVO &&
    competicion.tipoInscripcion !== TipoInscripcion.CERRADO;

  return (
    <div
      key={competicion.id}
      className="border border-neutral-800 bg-neutral-900/50 p-2 rounded-lg relative"
    >
      <p className="text-xl font-bold">{competicion.nombre}</p>
      <ChipEstadoCompeticion
        estadoCompeticion={competicion.estadoCompeticion}
      />
      <ChipInscripcion
        estadoCompeticion={competicion.estadoCompeticion}
        tipoInscripcion={competicion.tipoInscripcion}
      />
      <p className="text-xs text-neutral-500 my-3">{competicion.descripcion}</p>
      <div className="flex items-center gap-1">
        <div className="flex items-center gap-1 bg-neutral-800 w-fit p-1 text-xs rounded-md text-neutral-400 border border-neutral-600">
          <FontAwesomeIcon icon={faGamepad} />
          <p className="">{competicion.modalidadDeJuego}</p>
        </div>
        <div className="flex items-center gap-1 bg-neutral-800 w-fit p-1 text-xs rounded-md text-neutral-400 border border-neutral-600">
          <FontAwesomeIcon icon={faFutbol} />
          <p className="">{competicion.tipoDeFutbolin}</p>
        </div>
        <div className="flex items-center gap-1 bg-neutral-800 w-fit p-1 text-xs rounded-md text-neutral-400 border border-neutral-600">
          <FontAwesomeIcon icon={faTrophy} />
          <p className="">{competicion.tipoDeCompeticion}</p>
        </div>
      </div>

      {puedeApuntarse && (
        <BotonInscribirme
          estadoCompeticion={competicion.estadoCompeticion}
          tipoInscripcion={competicion.tipoInscripcion}
          idCompeticion={competicion.id}
        />
      )}
      <Link
        className="text-sm text-neutral-600 text-right block"
        href={`/competicion/torneos/${competicion.id}`}
      >
        Más detalles
      </Link>
    </div>
  );
};
