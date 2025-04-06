import { DetalleLigaPage } from "@/client/features/Competiciones/Ligas/pages/DetalleLigaPage";
import { LigasService } from "@/server/services/Competiciones/Ligas/LigasService";

interface PageProps {
  params: Promise<{
    idLiga: string;
  }>;
}

const page = async ({ params }: PageProps) => {
  
  const { idLiga } = await params;

  const liga = await LigasService.getById(idLiga);
  
  return <DetalleLigaPage competicion={liga} />;
};

export default page;
