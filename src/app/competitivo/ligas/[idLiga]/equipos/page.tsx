import { ListaEquiposLigaPage } from "@/client/features/Competiciones/Ligas/pages/ListaEquiposLigaPage";
import { EstadoEquipoCompeticion } from "@/core/enum/Competicion/EstadoEquipoCompeticion";
import { authOptions } from "@/server/lib/authOptions";
import { EquipoConEstadoDTO } from "@/server/models/Equipo/EquipoDTO";
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
  const competicion = await LigasService.getById(idLiga);
  
  const session = await getServerSession(authOptions);
  
  if(!session || !session.user){
    redirect("/not-allowed");
  }

  const equipos = await EquipoService.findManyById(competicion.equipos.map((e) => new Types.ObjectId(e.id)));
  const equiposConEstado = equipos.map((e) => ({...e, estado: competicion.equipos.find((e2) => e2.id === e.id)?.estado || EstadoEquipoCompeticion.ACEPTADO}))

  const isOwner = session?.user?.id === competicion.createdByUserId;

  const equiposMostrar:EquipoConEstadoDTO[] = isOwner 
  ? equiposConEstado 
  : equiposConEstado.filter((e) => e.estado === EstadoEquipoCompeticion.ACEPTADO)

  return <ListaEquiposLigaPage equipos={equiposMostrar} isOwner={isOwner} idCompeticion={idLiga} />
};

export default page;
