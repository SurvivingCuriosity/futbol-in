import ListaFutbolines from "@/features/FutbolinesCiudad/ListaFutbolines";
import { getFutbolinesByPlaceId } from "@/shared/services/Places/getLugaresCiudad";
import { cookies } from "next/headers";

const page = async () => {
  const cookiesStore = await cookies();
  const placeId = cookiesStore.get("selectedPlaceId")?.value;
  const futbolines = await getFutbolinesByPlaceId(placeId || "");

  return (
    <>
      <ListaFutbolines futbolines={futbolines} />
    </>
  );
};

export default page;
