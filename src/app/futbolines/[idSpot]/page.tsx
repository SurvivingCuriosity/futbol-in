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

  console.log('el id spot es', idSpot)
  const futbolin = await SpotService.getById(idSpot);
  console.log('el futbolin es', futbolin)
  const addedByUser = await UserService.findById(futbolin.addedByUserId);
  console.log('el addedByUser es', addedByUser)
  const user = addedByUser === null ? null : UserService.mapToDTO(addedByUser);
  return <DetalleFutbolinPage futbolin={futbolin} addedByUser={user} />;
};

export default page;
