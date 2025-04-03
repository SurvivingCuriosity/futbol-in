import { ListaParticipantes } from "@/client/features/Torneos/DetalleTorneo/components/ListaParticipantes";
import { CompeticionesService } from "@/server/services/Competiciones/CompeticionesService";

interface PageProps {
  params: Promise<{
    idCompeticion: string;
  }>;
}

const page = async ({ params }: PageProps) => {
  const { idCompeticion } = await params;
  const competicion = await CompeticionesService.getById(idCompeticion);
  
  return <ListaParticipantes competicion={competicion} />;
};

export default page;
