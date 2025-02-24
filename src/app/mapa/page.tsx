import { NavLayout } from "@/shared/components/NavLayout/NavLayout";
import { MapaPage } from "@/features/Mapa/MapaPage";
import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession();

  return (
    <NavLayout loggedIn={!!session}>
      <MapaPage />
    </NavLayout>
  );
}
