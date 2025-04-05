import { EstadoCompeticion } from "@/core/enum/Competicion/EstadoCompeticion";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ChipEstadoCompeticion = ({
  estadoCompeticion,
}: {
  estadoCompeticion: EstadoCompeticion;
}) => {

  const textMap: Record<EstadoCompeticion, string> = {
    [EstadoCompeticion.ACTIVO]: "Aún no ha comenzado",
    [EstadoCompeticion.EN_CURSO]: "En curso",
    [EstadoCompeticion.CERRADO]: "Finalizado",
  };
  const colorMap: Record<EstadoCompeticion, string> = {
    [EstadoCompeticion.ACTIVO]: "text-green-500",
    [EstadoCompeticion.EN_CURSO]: "text-amber-500",
    [EstadoCompeticion.CERRADO]: "text-red-500",
  };

  return (
    <>
      <div className={`text-xs p-1 flex items-center gap-1 rounded w-fit ${colorMap[estadoCompeticion]}`}>
        <FontAwesomeIcon icon={faClock} width={12} height={12} />
        {textMap[estadoCompeticion]}
      </div>
    </>
  );
};
