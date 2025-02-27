import FutbolinesCiudadPage from "@/features/FutbolinesCiudad/FutbolinesCiudadPage";
import { TopNavSearchLayout } from "@/shared/components/Layouts/TopNavSearchLayout";
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
  const futbolines = await getFutbolinesByPlaceId(placeId || "");

  return (
    <>
      <TopNavSearchLayout>
        <FutbolinesCiudadPage
          futbolines={futbolines}
          ciudad={decodeURIComponent(ciudad)}
        />
      </TopNavSearchLayout>
    </>
  );
};

export default page;
