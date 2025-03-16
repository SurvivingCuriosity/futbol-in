import { UltimasBusquedasLS } from "@/client/features/SpotsCiudad/components/UltimosSpotsLS/UltimasBusquedasLS";
import { UltimosSpotsLS } from "@/client/features/SpotsCiudad/components/UltimosSpotsLS/UltimosSpotsLS";
import SearchInputCiudad from "@/client/shared/components/SearchInputCiudad";

const page = async () => {

  return (
    <div className="w-full">
      <SearchInputCiudad />
      <UltimasBusquedasLS />
      <UltimosSpotsLS />
    </div>
  )
};

export default page;
