import { DetalleCompeticionPage } from "@/client/features/Torneos/DetalleTorneo/DetalleTorneoPage";
import { CompeticionesService } from "@/server/services/Competiciones/CompeticionesService";

interface PageProps {
  params: Promise<{
    idTorneo: string;
  }>;
}

const page = async ({ params }: PageProps) => {
  
  const { idTorneo } = await params;

  const competicion = await CompeticionesService.getById(idTorneo);
  
  return <DetalleCompeticionPage competicion={competicion} />;
};

export default page;
