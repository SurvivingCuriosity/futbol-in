import { DetalleCompeticionPage } from "@/client/features/Torneos/DetalleTorneo/DetalleTorneoPage";
import { CompeticionesService } from "@/server/services/Competiciones/CompeticionesService";

interface PageProps {
  params: Promise<{
    idCompeticion: string;
  }>;
}

const page = async ({ params }: PageProps) => {
  
  const { idCompeticion } = await params;

  const liga = await CompeticionesService.getById(idCompeticion);
  
  return <DetalleCompeticionPage competicion={liga} />;
};

export default page;
