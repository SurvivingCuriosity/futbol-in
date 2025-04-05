"use client";

import { EstadoCompeticion } from "@/core/enum/Competicion/EstadoCompeticion";
import { TipoInscripcion } from "@/core/enum/Competicion/TipoInscripcion";
import { Button } from "futbol-in-ui";
import { useRouter } from "next/navigation";

export const BotonInscribirme = ({
  tipoInscripcion,
  estadoCompeticion,
  idCompeticion,
}: {
  tipoInscripcion: TipoInscripcion;
  estadoCompeticion: EstadoCompeticion;
  idCompeticion: string;
}) => {

  const router = useRouter()

  const mostrarBotonInscribirme =
    tipoInscripcion !== TipoInscripcion.CERRADO &&
    estadoCompeticion === EstadoCompeticion.ACTIVO;

  const handleInscribirme = () => {
    router.push(`/competitivo/torneos/${idCompeticion}/join`);
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
