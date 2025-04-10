import { DetalleFutbolinPage } from "@/client/features/Spots/DetalleFutbolin/DetalleFutbolinPage";
import { SpotService } from "@/server/services/Spots/SpotsService";

export interface DetalleSpotPageProps {
  params: Promise<{
    idSpot: string;
  }>;
}

const page = async ({ params }: DetalleSpotPageProps) => {
  const {idSpot} = await params;

  const futbolin = await SpotService.getById(idSpot)

  return <DetalleFutbolinPage futbolin={futbolin} />
};

export default page