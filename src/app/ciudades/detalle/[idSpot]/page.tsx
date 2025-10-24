import { DetalleFutbolinPage } from "@/client/features/Spots/DetalleFutbolin/DetalleFutbolinPage";
import { SpotService } from "@/server/services/Spots/SpotsService";
import { UserService } from "@/server/services/User/UserService";

export interface DetalleSpotPageProps {
  params: Promise<{
    idSpot: string;
  }>;
}

const page = async ({ params }: DetalleSpotPageProps) => {
  const { idSpot } = await params;

  const futbolin = await SpotService.getById(idSpot);
  const addedByUser = await UserService.findById(futbolin.addedByUserId);
  const user = addedByUser === null ? null : UserService.mapToDTO(addedByUser);
  return <DetalleFutbolinPage futbolin={futbolin} addedByUser={user} />;
};

export default page;
