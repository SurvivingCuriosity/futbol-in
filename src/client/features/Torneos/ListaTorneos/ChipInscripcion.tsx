import { EstadoCompeticion } from "@/core/enum/Competicion/EstadoCompeticion";
import { TipoInscripcion } from "@/core/enum/Competicion/TipoInscripcion";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ChipInscripcion = ({
  tipoInscripcion,
  estadoCompeticion,
}: {
  tipoInscripcion: TipoInscripcion;
  estadoCompeticion: EstadoCompeticion;
}) => {
  const textMap: Record<TipoInscripcion, string> = {
    [TipoInscripcion.ABIERTO]: "Puedes apuntarte",
    [TipoInscripcion.SEMIABIERTO]: "El organizador debe aceptar tu inscripción",
    [TipoInscripcion.CERRADO]: "Contacta con el organizador para inscribirte",
  };
  const colorMap: Record<TipoInscripcion, string> = {
    [TipoInscripcion.ABIERTO]: "text-green-500",
    [TipoInscripcion.SEMIABIERTO]: "text-amber-500",
    [TipoInscripcion.CERRADO]: "text-neutral-500",
  };

  return (
    <>
      {estadoCompeticion === EstadoCompeticion.ACTIVO && (
        <div
          className={`text-xs p-1 flex items-center gap-1 rounded w-fit ${colorMap[tipoInscripcion]}`}
        >
          <FontAwesomeIcon icon={faListCheck} width={12} height={12}/>
          {textMap[tipoInscripcion]}
        </div>
      )}
    </>
  );
};
