import { CompeticionDTO } from "@/server/models/Competicion/CompeticionDTO";
import {
  faFutbol,
  faGamepad,
  faTrophy
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const MainInfo = ({
  competicion,
}: {
  competicion: CompeticionDTO;
}) => {

  return (
    <>
      <p className="text-neutral-400 p-2 text-sm">{competicion.descripcion}</p>

      <div className="flex items-center gap-1 p-2">
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
    </>
  );
};
