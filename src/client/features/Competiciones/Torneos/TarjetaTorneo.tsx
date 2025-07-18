import { iconTipoDeCompeticionMap } from "@/client/shared/constants/IconTipoDeCompeticionMap";
import { authOptions } from "@/server/lib/authOptions";
import { TorneoDTO } from "futbol-in-core/types";
import { CompeticionesService } from "@/server/services/Competiciones/CompeticionesService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { BotonInscribirmeACompeticion } from "../common/BotonInscribirmeACompeticion";
import { ChipEstadoCompeticion } from "../common/ChipEstadoCompeticion";
import { ChipEstadoInscripcion } from "../common/ChipInscripcion";
import { EstadoCompeticion, TipoCompeticion, TipoInscripcion } from "futbol-in-core/enum";

export const TarjetaTorneo = async ({
  competicion,
}: {
  competicion: TorneoDTO;
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

  return (
    <div
      key={competicion.id}
      className="border border-neutral-800 bg-neutral-700/50 p-2 rounded-lg relative overflow-hidden h-max shrink-0"
    >

      <FontAwesomeIcon icon={iconTipoDeCompeticionMap[TipoCompeticion.TORNEO]} width={150} height={150} className="absolute opacity-10 w-fit -top-4 right-0 -rotate-12 text-[100px]" />

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
          <BotonInscribirmeACompeticion
            estadoCompeticion={competicion.estadoCompeticion}
            tipoInscripcion={competicion.tipoInscripcion}
            idCompeticion={competicion.id}
            tipoCompeticion={TipoCompeticion.TORNEO}
          />
        )}
        <Link
          className="text-sm text-neutral-600 text-right block ml-auto"
          href={`/competitivo/torneos/${competicion.id}`}
        >
          Más detalles
        </Link>
      </div>
    </div>
  );
};
