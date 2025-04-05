import { EstadoCompeticion } from "@/core/enum/Competicion/EstadoCompeticion";
import { TipoInscripcion } from "@/core/enum/Competicion/TipoInscripcion";
import { authOptions } from "@/server/lib/authOptions";
import { CompeticionDTO } from "@/server/models/Competicion/CompeticionDTO";
import { CompeticionesService } from "@/server/services/Competiciones/CompeticionesService";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { BotonInscribirme } from "../DetalleTorneo/components/BotonInscribirme";
import { ChipEstadoCompeticion } from "./ChipEstadoCompeticion";
import { ChipEstadoInscripcion } from "./ChipInscripcion";
import { TipoCompeticion } from "@/core/enum/Competicion/TipoCompeticion";

export const TarjetaCompeticion = async ({
  competicion,
}: {
  competicion: CompeticionDTO;
}) => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) return null;

  const equipoInscrito = await CompeticionesService.getEquipoInscrito(
    competicion.id,
    user?.id
  );
  const estaInscrito = equipoInscrito !== undefined;

  const puedeApuntarse =
    competicion.estadoCompeticion === EstadoCompeticion.ACTIVO &&
    competicion.tipoInscripcion !== TipoInscripcion.CERRADO &&
    !estaInscrito;

  const enlaceDetalles =
    competicion.tipoDeCompeticion === TipoCompeticion.TORNEO
      ? `/competitivo/torneos/${competicion.id}`
      : `/competitivo/ligas/${competicion.id}`;

  return (
    <div
      key={competicion.id}
      className="border border-neutral-800 bg-neutral-900/50 p-2 rounded-lg relative"
    >
      <p className="text-xl font-bold">{competicion.nombre}</p>

      <ChipEstadoInscripcion
        equipoInscrito={equipoInscrito}
        tipoInscripcion={competicion.tipoInscripcion}
      />

      <ChipEstadoCompeticion
        estadoCompeticion={competicion.estadoCompeticion}
      />

      <div className="flex items-center justify-between mt-4">
        {puedeApuntarse && (
          <BotonInscribirme
            estadoCompeticion={competicion.estadoCompeticion}
            tipoInscripcion={competicion.tipoInscripcion}
            idCompeticion={competicion.id}
          />
        )}
        <Link
          className="text-sm text-neutral-600 text-right block ml-auto"
          href={enlaceDetalles}
        >
          Más detalles
        </Link>
      </div>
    </div>
  );
};
