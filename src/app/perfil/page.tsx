import { NavLayout } from "@/components/NavLayout/NavLayout";
import { MiPerfilPage } from "@/features/MiPerfil/MiPerfilPage";
import { getServerSession } from "next-auth";

export default async function page() {
  const session = await getServerSession();

  return (
    <NavLayout loggedIn={!!session}>
      {/* @ts-expect-error qwe */}
      <MiPerfilPage user={session?.user} />
    </NavLayout>
  );
}
