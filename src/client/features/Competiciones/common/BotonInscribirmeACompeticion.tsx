import { EstadoCompeticion } from "@/core/enum/Competicion/EstadoCompeticion";
import { TipoCompeticion } from "@/core/enum/Competicion/TipoCompeticion";
import { TipoInscripcion } from "@/core/enum/Competicion/TipoInscripcion";
import Link from "next/link";

export const BotonInscribirmeACompeticion = ({
  tipoInscripcion,
  estadoCompeticion,
  idCompeticion,
  tipoCompeticion
}: {
  tipoInscripcion: TipoInscripcion;
  estadoCompeticion: EstadoCompeticion;
  idCompeticion: string;
  tipoCompeticion: TipoCompeticion
}) => {

  const mostrarBotonInscribirme =
    tipoInscripcion !== TipoInscripcion.CERRADO &&
    estadoCompeticion === EstadoCompeticion.ACTIVO;


  return (
    <div className="w-fit">
      {mostrarBotonInscribirme && (
        
        <Link href={
          tipoCompeticion === TipoCompeticion.TORNEO
            ? `/competitivo/torneos/${idCompeticion}/join`
            : `/competitivo/ligas/${idCompeticion}/join`
        }>
          Inscribirme
        </Link>
      
      )}
    </div>
  );
};
