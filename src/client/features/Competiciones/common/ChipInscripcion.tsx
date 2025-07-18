import { EstadoEquipoCompeticion } from "futbol-in-core/enum";
import { TipoInscripcion } from "futbol-in-core/enum";
import { EquipoCompeticionDTO } from "futbol-in-core/types";
import { faCheck, faHourglass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ChipEstadoInscripcion = ({
  equipoInscrito,
  tipoInscripcion
}: {
  equipoInscrito:EquipoCompeticionDTO| undefined;
  tipoInscripcion: TipoInscripcion
}) => {
  const estaInscrito = equipoInscrito !== undefined;

  return (
    <>
      {estaInscrito &&
        equipoInscrito.estado === EstadoEquipoCompeticion.ACEPTADO && (
          <div className="my-2 flex items-center gap-2 text-xs w-min bg-sky-300/10 text-sky-500 p-1 rounded">
            <FontAwesomeIcon icon={faCheck} />
            <p>Inscrito</p>
          </div>
        )}
      {!estaInscrito && tipoInscripcion === TipoInscripcion.SEMIABIERTO && (
          <div className="my-2 flex items-center gap-2 text-xs w-fit bg-amber-300/10 text-amber-500 p-1 rounded">
            <FontAwesomeIcon icon={faHourglass} />
            <p>El administrador debe aceptar tu inscripción</p>
          </div>
        )}
              {estaInscrito &&
        equipoInscrito.estado === EstadoEquipoCompeticion.PENDIENTE && (
          <div className="my-2 flex items-center gap-2 text-xs w-fit bg-amber-300/10 text-amber-500 p-1 rounded">
            <FontAwesomeIcon icon={faHourglass} />
            <p>Pendiente de aceptar inscripción</p>
          </div>
        )}
    </>
  );
};
