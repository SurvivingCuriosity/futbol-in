import FutbolinesCiudadPage from "@/features/FutbolinesCiudad/FutbolinesCiudadPage";
import { TopNavSearch } from "@/shared/components/NavLayout/TopNavSearch";
import { getFutbolinesByPlaceId } from "@/shared/services/Places/getLugaresCiudad";
import { cookies } from "next/headers";

interface CityPageProps {
  params: Promise<{
    ciudad: string;
    placeId: string;
  }>;
}

const page = async ({ params }: CityPageProps) => {
  const { ciudad } = await params;

  const cookiesStore = await cookies();
  const placeId = cookiesStore.get("selectedPlaceId")?.value;
  console.log('El place id')
  const futbolines = await getFutbolinesByPlaceId(placeId || '');

  return (
    <>
      <TopNavSearch />
      <div className="p-8 pt-20">
        <FutbolinesCiudadPage futbolines={futbolines} ciudad={decodeURIComponent(ciudad)} />
      </div>
    </>
  );
};

export default page;
