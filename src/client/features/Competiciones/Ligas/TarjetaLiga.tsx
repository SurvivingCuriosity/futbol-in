"use client";

import { LigasClient } from "@/client/shared/client/LigasClient";
import { iconTipoDeCompeticionMap } from "@/client/shared/constants/IconTipoDeCompeticionMap";
import { EstadoCompeticion } from "@/core/enum/Competicion/EstadoCompeticion";
import { TipoCompeticion } from "@/core/enum/Competicion/TipoCompeticion";
import { TipoInscripcion } from "@/core/enum/Competicion/TipoInscripcion";
import { LigaDTO } from "@/server/models/Competicion/Ligas/LigaDTO";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use } from "react";
import { toast } from "react-toastify";
import { BotonInscribirmeACompeticion } from "../common/BotonInscribirmeACompeticion";
import { ChipEstadoCompeticion } from "../common/ChipEstadoCompeticion";
import { ChipEstadoInscripcion } from "../common/ChipInscripcion";
import { ListaLigasContext } from "./ListaLigas/ListaLigasContext";

export const TarjetaLiga = ({ liga }: { liga: LigaDTO }) => {
  const router = useRouter();

  const { equiposUsuario, loggedInUser } = use(ListaLigasContext);

  const isOwner = liga.createdByUserId === loggedInUser?.id;

  const equipoInscrito = liga.equipos.find((e) =>
    equiposUsuario.find((u) => u.id === e.id)
  );

  const estaInscrito = equipoInscrito !== undefined;

  const puedeApuntarse =
    liga.estadoCompeticion === EstadoCompeticion.ACTIVO &&
    liga.tipoInscripcion !== TipoInscripcion.CERRADO &&
    !estaInscrito;

  const handleBorrarLiga = async () => {
    const res = await LigasClient.borrarLiga({
      idLiga: liga.id,
    });

    console.log(res)

    if (res.success) {
      toast.success("Liga eliminada");
      router.refresh();
    }
  };

  return (
    <div
      key={liga.id}
      className="border border-neutral-800 bg-neutral-700/50 p-2 rounded-lg relative overflow-hidden h-max shrink-0"
    >
      {isOwner && <button onClick={handleBorrarLiga} className="z-20 absolute top-1 right-1 text-red-400 bg-red-500/30 p-1 rounded text-xs">Borrar</button>}

      <FontAwesomeIcon
        icon={iconTipoDeCompeticionMap[TipoCompeticion.LIGA]}
        width={150}
        height={150}
        className="absolute opacity-10 w-fit -top-4 right-0 -rotate-12 text-[100px]"
      />

      <p className="text-xl font-bold">{liga.nombre}</p>

      <ChipEstadoInscripcion
        equipoInscrito={equipoInscrito}
        tipoInscripcion={liga.tipoInscripcion}
      />

      <ChipEstadoCompeticion estadoCompeticion={liga.estadoCompeticion} />

      <div className="flex items-center justify-between mt-4">
        {puedeApuntarse && (
          <BotonInscribirmeACompeticion
            estadoCompeticion={liga.estadoCompeticion}
            tipoInscripcion={liga.tipoInscripcion}
            idCompeticion={liga.id}
            tipoCompeticion={TipoCompeticion.LIGA}
          />
        )}
        <Link
          className="text-sm text-neutral-600 text-right block ml-auto"
          href={`/competitivo/ligas/${liga.id}`}
        >
          Más detalles
        </Link>
      </div>
    </div>
  );
};
