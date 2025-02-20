import { NavLayout } from "@/components/NavLayout/NavLayout";
import { PerfilPage } from "@/features/Perfil/PerfilPage";
import { getServerSession } from "next-auth";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const session = await getServerSession();
  return (
    <NavLayout loggedIn={!!session}>
      <PerfilPage user={id} />
    </NavLayout>
  );
}
