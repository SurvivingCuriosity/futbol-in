import { EditarSpotPage } from "@/client/features/EditarSpot/EditarSpotPage";
import { SpotService } from "@/server/services/Spots/SpotsService";

export interface EditarSpotPageProps {
  params: Promise<{
    idSpot: string;
  }>;
}

const page = async ({ params }: EditarSpotPageProps) => {

  const { idSpot } = await params;

  const futbolin = await SpotService.getById(idSpot);

  return <EditarSpotPage futbolin={futbolin} />;
};

export default page;
