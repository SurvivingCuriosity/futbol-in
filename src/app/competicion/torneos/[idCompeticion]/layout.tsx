import { BotonInscribirme } from "@/client/features/Torneos/DetalleTorneo/components/BotonInscribirme";
import { BotonesOwner } from "@/client/features/Torneos/DetalleTorneo/components/BotonesOwner";
import { Nav } from "@/client/features/Torneos/components/Nav";
import { EstadoCompeticion } from "@/core/enum/Competicion/EstadoCompeticion";
import { authOptions } from "@/server/lib/authOptions";
import { CompeticionesService } from "@/server/services/Competiciones/CompeticionesService";
import { GoogleMapsService } from "@/server/services/GoogleMaps/GoogleMapsService";
import { faLocationDot, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getServerSession } from "next-auth";
import React from "react";

interface PageProps {
  params: Promise<{ idCompeticion: string }>;
  children: React.ReactElement;
}

const layout = async ({ params, children }: PageProps) => {
  const { idCompeticion } = await params;

  const competicion = await CompeticionesService.getById(idCompeticion);
  const placeDetails = await GoogleMapsService.getPlaceDetailsFromPlaceId(
    competicion.googlePlaceId
  );
  const session = await getServerSession(authOptions);
  const isOwner = session?.user?.id === competicion.createdByUserId;

  const estaInscrito = competicion.equipos.find((e) => e.id === session?.user?.id) !== undefined;

  return (
    <>
      <div className="border-b w-full border-primary relative overflow-hidden">
        <FontAwesomeIcon
          icon={faTrophy}
          className="absolute -top-2 md:absolute -right-2 text-neutral-500/20 -rotate-12 text-[100px]"
        />
        <h1 className="text-xl md:text-4xl font-black text-primary">
          {competicion.nombre}
        </h1>
        <div className="my-2">
          <div className="flex items-center">
            <FontAwesomeIcon width={20} height={20} icon={faLocationDot} />
            <p className="text-neutral-300 text-lg font-bold tracking-tighter">
              {placeDetails.name}
            </p>
          </div>
          <p className="text-neutral-500 text-sm pl-2">
            {placeDetails.vicinity}
          </p>
        </div>
        {isOwner && (
          <BotonesOwner
            idCompeticion={competicion.id}
            competicionNoHaArrancado={
              competicion.estadoCompeticion === EstadoCompeticion.ACTIVO
            }
          />
        )}
        <BotonInscribirme
          idCompeticion={competicion.id}
          estadoCompeticion={competicion.estadoCompeticion}
          tipoInscripcion={competicion.tipoInscripcion}
        />
      </div>
      <Nav idCompeticion={idCompeticion} estaInscrito={estaInscrito}/>
      {children}
    </>
  );
};

export default layout;
