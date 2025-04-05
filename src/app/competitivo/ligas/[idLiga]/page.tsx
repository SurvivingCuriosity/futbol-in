import { DetalleCompeticionPage } from "@/client/features/Torneos/DetalleTorneo/DetalleTorneoPage";
import { CompeticionesService } from "@/server/services/Competiciones/CompeticionesService";

interface PageProps {
  params: Promise<{
    idLiga: string;
  }>;
}

const page = async ({ params }: PageProps) => {
  
  const { idLiga } = await params;

  const liga = await CompeticionesService.getById(idLiga);
  
  return <DetalleCompeticionPage competicion={liga} />;
};

export default page;
