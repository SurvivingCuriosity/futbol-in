import { DetalleTorneoPage } from "@/client/features/Competiciones/Torneos/DetalleTorneo/DetalleTorneoPage";
import { TorneosService } from "@/server/services/Competiciones/Torneos/TorneosService";

interface PageProps {
  params: Promise<{
    idTorneo: string;
  }>;
}

const page = async ({ params }: PageProps) => {
  
  const { idTorneo } = await params;

  const torneo = await TorneosService.getById(idTorneo);
  
  return <DetalleTorneoPage competicion={torneo} />;
};

export default page;
