"use client";

import { EstadoCompeticion } from "@/core/enum/Competicion/EstadoCompeticion";
import { TipoCompeticion } from "@/core/enum/Competicion/TipoCompeticion";
import { TipoInscripcion } from "@/core/enum/Competicion/TipoInscripcion";
import { Button } from "futbol-in-ui";
import { useRouter } from "next/navigation";

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

  const router = useRouter()

  const mostrarBotonInscribirme =
    tipoInscripcion !== TipoInscripcion.CERRADO &&
    estadoCompeticion === EstadoCompeticion.ACTIVO;

  const handleInscribirme = () => {
    if(tipoCompeticion === TipoCompeticion.TORNEO) {
      router.push(`/competitivo/torneos/${idCompeticion}/join`);
    } 
    
    if(tipoCompeticion === TipoCompeticion.LIGA) {
      router.push(`/competitivo/ligas/${idCompeticion}/join`);
    }
  };

  return (
    <div className="w-fit">
      {mostrarBotonInscribirme && (
        <Button
          label="Inscribirme"
          onClick={handleInscribirme}
          variant="primary"
          size="sm"
        />
      )}
    </div>
  );
};
