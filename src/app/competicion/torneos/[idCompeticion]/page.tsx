import { DetalleCompeticionPage } from "@/client/features/Torneos/DetalleTorneo/DetalleTorneoPage";
import { authOptions } from "@/server/lib/authOptions";
import { CompeticionesService } from "@/server/services/Competiciones/CompeticionesService";
import { GoogleMapsService } from "@/server/services/GoogleMaps/GoogleMapsService";
import { getServerSession } from "next-auth";

interface PageProps {
  params: Promise<{
    idCompeticion: string;
  }>;
}

const page = async ({ params }: PageProps) => {
  
  const { idCompeticion } = await params;

  const competicion = await CompeticionesService.getById(idCompeticion);
  const placeDetails = await GoogleMapsService.getPlaceDetailsFromPlaceId(competicion.googlePlaceId);
  const session = await getServerSession(authOptions);
  const isOwner = session?.user?.id === competicion.createdByUserId;

  return <DetalleCompeticionPage competicion={competicion} placeDetails={placeDetails} isOwner={!!isOwner}/>;
};

export default page;
