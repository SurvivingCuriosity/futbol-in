import { CompeticionDTO } from "@/server/models/Competicion/CompeticionDTO";
import {
  faFutbol,
  faGamepad,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export const TarjetaCompeticion = ({
  competicion,
}: {
  competicion: CompeticionDTO;
}) => {
  return (
    <div
      key={competicion.id}
      className="border border-neutral-500 p-2 rounded-lg"
    >
      <p className="text-xl font-bold">{competicion.nombre}</p>
      <p className="text-xs text-neutral-500 mb-3">{competicion.descripcion}</p>
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
      <Link
        className="text-sm text-neutral-600 text-right block"
        href={`/competicion/torneos/${competicion.id}`}
      >
        Más detalles
      </Link>
    </div>
  );
};
