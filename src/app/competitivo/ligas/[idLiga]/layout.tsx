import { BotonInscribirme } from "@/client/features/Torneos/DetalleTorneo/components/BotonInscribirme";
import { BotonesOwner } from "@/client/features/Torneos/DetalleTorneo/components/BotonesOwner";
import { ChipEstadoInscripcion } from "@/client/features/Torneos/ListaTorneos/ChipInscripcion";
import { NavLigas } from "@/client/features/Torneos/components/NavLigas";
import { GoBackLayout } from "@/client/shared/layouts/GoBackLayout";
import { EstadoCompeticion } from "@/core/enum/Competicion/EstadoCompeticion";
import { authOptions } from "@/server/lib/authOptions";
import { CompeticionesService } from "@/server/services/Competiciones/CompeticionesService";
import { GoogleMapsService } from "@/server/services/GoogleMaps/GoogleMapsService";
import { UserService } from "@/server/services/User/UserService";
import { faLocationDot, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

interface PageProps {
  params: Promise<{ idLiga: string }>;
  children: React.ReactElement;
}

const layout = async ({ params, children }: PageProps) => {
  const { idLiga } = await params;

  const liga = await CompeticionesService.getById(idLiga);
  const placeDetails = await GoogleMapsService.getPlaceDetailsFromPlaceId(
    liga.googlePlaceId
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

  const isOwner = session?.user?.id === liga.createdByUserId;

  const equipoInscrito = await CompeticionesService.getEquipoInscrito(
    idLiga,
    userDb.id
  );
  const yaEstaInscrito = equipoInscrito !== undefined;

  return (
    <GoBackLayout href="/competitivo/ligas" label="Ligas" className="max-w-3xl mx-auto">
      <div className="border-0 sm:border pb-2 w-full border-primary/50 relative p-4 xl:p-8 rounded-2xl bg-neutral-900">
        <FontAwesomeIcon
          icon={faTrophy}
          className="absolute top-2 left-2 xl:right-0 text-neutral-500/20 -rotate-12 md:text-[150px] text-[100px]"
        />
        <h1 className="text-xl md:text-4xl lg:mb-4 font-black text-primary">
          {liga.nombre}
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
            idCompeticion={liga.id}
            competicionNoHaArrancado={
              liga.estadoCompeticion === EstadoCompeticion.ACTIVO
            }
          />
        )}

        <ChipEstadoInscripcion equipoInscrito={equipoInscrito} tipoInscripcion={liga.tipoInscripcion}/>

        {!yaEstaInscrito && (
          <BotonInscribirme
          idCompeticion={liga.id}
            estadoCompeticion={liga.estadoCompeticion}
            tipoInscripcion={liga.tipoInscripcion}
          />
        )}
      </div>
      <NavLigas idCompeticion={idLiga} estaInscrito={yaEstaInscrito} />
      {children}
    </GoBackLayout>
  );
};

export default layout;
