import { ListaParticipantes } from "@/client/features/Torneos/DetalleTorneo/components/ListaParticipantes";
import { CompeticionesService } from "@/server/services/Competiciones/CompeticionesService";
import { EquipoService } from "@/server/services/Equipo/EquipoService";
import { Types } from "mongoose";

interface PageProps {
  params: Promise<{
    idCompeticion: string;
  }>;
}

const page = async ({ params }: PageProps) => {
  const { idCompeticion } = await params;
  const competicion = await CompeticionesService.getById(idCompeticion);
  
  const equipos = await EquipoService.findManyById(competicion.equipos.map((e) => new Types.ObjectId(e.id)));

  return <ListaParticipantes equipos={equipos} />
};

export default page;
