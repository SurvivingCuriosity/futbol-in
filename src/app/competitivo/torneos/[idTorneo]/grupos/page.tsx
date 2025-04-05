import { ListaParticipantes } from "@/client/features/Torneos/DetalleTorneo/components/ListaParticipantes";
import { EstadoEquipoCompeticion } from "@/core/enum/Competicion/EstadoEquipoCompeticion";
import { authOptions } from "@/server/lib/authOptions";
import { EquipoConEstadoDTO } from "@/server/models/Equipo/EquipoDTO";
import { CompeticionesService } from "@/server/services/Competiciones/CompeticionesService";
import { EquipoService } from "@/server/services/Equipo/EquipoService";
import { Types } from "mongoose";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{
    idTorneo: string;
  }>;
}

const page = async ({ params }: PageProps) => {
  const { idTorneo } = await params;
  const competicion = await CompeticionesService.getById(idTorneo);
  
  
  const session = await getServerSession(authOptions);
  
  if(!session){
    redirect("/not-allowed");
  }

  const equipos = await EquipoService.findManyById(competicion.equipos.map((e) => new Types.ObjectId(e.id)));
  const equiposConEstado = equipos.map((e) => ({...e, estado: competicion.equipos.find((e2) => e2.id === e.id)?.estado || EstadoEquipoCompeticion.ACEPTADO}))

  const isOwner = session?.user?.id === competicion.createdByUserId;

  const equiposMostrar:EquipoConEstadoDTO[] = isOwner 
  ? equiposConEstado 
  : equiposConEstado.filter((e) => e.estado === EstadoEquipoCompeticion.ACEPTADO)

  return <ListaParticipantes equipos={equiposMostrar} isOwner={isOwner} idCompeticion={idTorneo}/>
};

export default page;
