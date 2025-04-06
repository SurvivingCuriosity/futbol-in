import { BotonesOwner } from "@/client/features/Competiciones/common/BotonesOwner";
import { BotonInscribirme } from "@/client/features/Competiciones/common/BotonInscribirme";
import { ChipEstadoInscripcion } from "@/client/features/Competiciones/common/ChipInscripcion";
import { NavTorneos } from "@/client/features/Competiciones/Torneos/components/NavTorneos";
import { GoBackLayout } from "@/client/shared/layouts/GoBackLayout";
import { EstadoCompeticion } from "@/core/enum/Competicion/EstadoCompeticion";
import { TipoCompeticion } from "@/core/enum/Competicion/TipoCompeticion";
import { authOptions } from "@/server/lib/authOptions";
import { TorneosService } from "@/server/services/Competiciones/Torneos/TorneosService";
import { GoogleMapsService } from "@/server/services/GoogleMaps/GoogleMapsService";
import { UserService } from "@/server/services/User/UserService";
import { faLocationDot, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

interface PageProps {
  params: Promise<{ idTorneo: string }>;
  children: React.ReactElement;
}

const layout = async ({ params, children }: PageProps) => {
  const { idTorneo } = await params;

  const torneo = await TorneosService.getById(idTorneo);
  const placeDetails = await GoogleMapsService.getPlaceDetailsFromPlaceId(
    torneo.googlePlaceId ?? ''
  );
  const session = await getServerSession(authOptions);

  const user = session?.user;

  if (!user) {
    redirect("/not-allowed");
  }

  const userDb = await UserService.findById(user.id);

  if (!userDb) {
    throw new Error("Usuario no encontrado en la base de datos");
  }

  const isOwner = session?.user?.id === torneo.createdByUserId;

  const equipoInscrito = await TorneosService.getEquipoInscrito(
    idTorneo,
    userDb.id
  );
  const yaEstaInscrito = equipoInscrito !== undefined;

  return (
    <GoBackLayout
      href="/competitivo/competiciones"
      label="Torneos"
      className="max-w-3xl mx-auto"
    >
      <div className="border-0 sm:border pb-2 w-full border-primary/50 relative p-4 xl:p-8 rounded-2xl bg-neutral-900">
        <FontAwesomeIcon
          icon={faTrophy}
          className="absolute top-2 left-2 xl:right-0 text-neutral-500/20 -rotate-12 md:text-[150px] text-[100px]"
        />
        <h1 className="text-xl md:text-4xl lg:mb-4 font-black text-primary">
          {torneo.nombre}
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
            idCompeticion={torneo.id}
            competicionNoHaArrancado={
              torneo.estadoCompeticion === EstadoCompeticion.ACTIVO
            }
          />
        )}

        <ChipEstadoInscripcion
          equipoInscrito={equipoInscrito}
          tipoInscripcion={torneo.tipoInscripcion}
        />

        {!yaEstaInscrito && (
          <BotonInscribirme
            idCompeticion={torneo.id}
            estadoCompeticion={torneo.estadoCompeticion}
            tipoInscripcion={torneo.tipoInscripcion}
            tipoCompeticion={TipoCompeticion.TORNEO}
          />
        )}
      </div>
      <NavTorneos idCompeticion={idTorneo} estaInscrito={yaEstaInscrito} />
      {children}
    </GoBackLayout>
  );
};

export default layout;
