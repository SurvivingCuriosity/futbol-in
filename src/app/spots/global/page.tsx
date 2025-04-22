import { MapaGlobalPage } from "@/client/features/Mapa/MapaGlobalPage";
import { SpotService } from "@/server/services/Spots/SpotsService";

const page = async () => {
  const spots = await SpotService.getAll();

  return (
    <>
        <MapaGlobalPage spots={spots}/>
    </>
  );
};

export default page;
