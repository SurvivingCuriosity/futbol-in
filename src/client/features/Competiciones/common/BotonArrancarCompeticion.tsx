"use client";
import { CompeticionesClient } from "@/client/shared/client/CompeticionesClient";
import { EstadoCompeticion } from "@/core/enum/Competicion/EstadoCompeticion";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const BotonArrancarCompeticion = ({
  idCompeticion,
  competicionNoHaArrancado,
}: {
  idCompeticion: string;
  competicionNoHaArrancado: boolean;
}) => {

  const handleIniciarCompeticion = async () => {
    const res = await CompeticionesClient.editar({
      idCompeticion,
      data: {
        estadoCompeticion: EstadoCompeticion.EN_CURSO,
      },
    });
    console.log(res);
  };

  return (
    <div className="flex gap-2 z-1 relative mb-2 items-center justify-start">

      {competicionNoHaArrancado && (
        <button onClick={handleIniciarCompeticion} className="max-w-xs bg-neutral-800 gap-2 flex items-center justify-center border border-neutral-600 text-neutral-400 p-2 rounded-lg px-4 w-full text-center">
          <FontAwesomeIcon icon={faPlay} />
          Iniciar competición
        </button>
      )}
    </div>
  );
};
