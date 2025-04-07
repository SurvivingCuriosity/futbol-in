import { PartidosLigaPage } from "@/client/features/Competiciones/Ligas/PartidosLiga/PartidosLigaPage";
import { EstadoEquipoCompeticion } from "@/core/enum/Competicion/EstadoEquipoCompeticion";
import { authOptions } from "@/server/lib/authOptions";
import { EquipoConEstadoDTO } from "@/server/models/Equipo/EquipoDTO";
import { CompeticionesService } from "@/server/services/Competiciones/CompeticionesService";
import { LigasService } from "@/server/services/Competiciones/Ligas/LigasService";
import { EquipoService } from "@/server/services/Equipo/EquipoService";
import { Types } from "mongoose";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{
    idLiga: string;
  }>;
}

const page = async ({ params }: PageProps) => {
  const { idLiga } = await params;

  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/not-allowed");
  }

  const liga = await LigasService.getById(idLiga);
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

  const isOwner = session?.user?.id === liga.createdByUserId;

  const equiposMostrar: EquipoConEstadoDTO[] = isOwner
    ? equiposConEstado
    : equiposConEstado.filter(
        (e) => e.estado === EstadoEquipoCompeticion.ACEPTADO
      );
  const equipoInscrito = await CompeticionesService.getEquipoInscrito(
    idLiga,
    session.user?.id
  );

  return (
    <PartidosLigaPage
      configEnfrentamiento={liga.configEnfrentamiento}
      partidos={enfrentamientos}
      equipos={equiposMostrar}
      equipoInscrito={equipoInscrito}
      isOwner={isOwner}
    />
  );
};

export default page;
