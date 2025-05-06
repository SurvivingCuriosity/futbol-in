import { ChipEstadoInscripcion } from "@/client/features/Competiciones/common/ChipInscripcion";
import { DetalleLigaProvider } from "@/client/features/Competiciones/Ligas/DetalleLiga/DetalleLigaContext";
import { NavLigas } from "@/client/features/Competiciones/Ligas/NavLigas";
import { GoBackLayout } from "@/client/shared/layouts/GoBackLayout";
import { EstadoEquipoCompeticion } from "@/core/enum/Competicion/EstadoEquipoCompeticion";
import { authOptions } from "@/server/lib/authOptions";
import { LigaDTO } from "@/server/models/Competicion/Ligas/LigaDTO";
import { CompeticionesService } from "@/server/services/Competiciones/CompeticionesService";
import { LigasService } from "@/server/services/Competiciones/Ligas/LigasService";
import { EquipoService } from "@/server/services/Equipo/EquipoService";
import { GoogleMapsService } from "@/server/services/GoogleMaps/GoogleMapsService";
import { UserService } from "@/server/services/User/UserService";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Types } from "mongoose";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

interface PageProps {
  params: Promise<{ idLiga: string }>;
  children: React.ReactElement;
}

const layout = async ({ params, children }: PageProps) => {
  const { idLiga } = await params;

  let liga: LigaDTO | null = null;

  try {
    liga = await LigasService.getById(idLiga);
  } catch {
    liga = null;
  }

  if (liga === null) {
    return (
      <p className="text-center p-10 text-neutral-500">
        Ups, esta liga ya no existe...
      </p>
    );
  }

  const placeDetails = await GoogleMapsService.getPlaceDetailsFromPlaceId(
    liga.googlePlaceId ?? ""
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
  const enfrentamientos = await LigasService.getEnfrentamientos(idLiga);
  const equipos = await EquipoService.findManyById(
    liga.equipos.map((e) => new Types.ObjectId(e.id))
  );
  const equiposConEstado = equipos.map((e) => ({
    ...e,
    estado:
      liga.equipos.find((e2) => e2.id === e.id)?.estado ||
      EstadoEquipoCompeticion.ACEPTADO,
  }));

  return (
    <GoBackLayout
      href="/competitivo/ligas"
      label="Ligas"
      className="max-w-3xl mx-auto"
    >
      <DetalleLigaProvider
        value={{
          liga,
          equipos: equiposConEstado,
          equipoInscrito,
          enfrentamientos,
          isOwner,
          placeDetails,
        }}
      >
        <div className="overflow-hidden border-0 sm:border pb-2 w-full border-primary/50 relative p-4 xl:p-8 rounded-2xl bg-neutral-900">
          <FontAwesomeIcon
            icon={faTrophy}
            className="pointer-events-none absolute top-2 left-2 xl:right-0 text-neutral-500/20 -rotate-12 md:text-[100px] text-[70px]"
          />
          <h1 className="text-xl md:text-4xl lg:mb-4 font-black text-primary">
            {liga.nombre}
          </h1>
          <p className="text-neutral-200">{liga.ciudad}</p>

          <span className="absolute top-0 right-2">
            <ChipEstadoInscripcion
              equipoInscrito={equipoInscrito}
              tipoInscripcion={liga.tipoInscripcion}
            />
          </span>
        </div>
        <NavLigas idCompeticion={idLiga} estaInscrito={yaEstaInscrito} />
        {children}
      </DetalleLigaProvider>
    </GoBackLayout>
  );
};

export default layout;
