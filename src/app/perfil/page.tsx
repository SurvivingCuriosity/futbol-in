import { NavLayout } from "@/components/NavLayout/NavLayout";
import { MiPerfilPage } from "@/features/MiPerfil/MiPerfilPage";
import { authOptions } from "@/shared/lib/authOptions";
import { IUser } from "@/shared/models/User/IUser";
import { getServerSession } from "next-auth";

export default async function page() {
  const session = await getServerSession(authOptions);

  return (
    <NavLayout loggedIn={!!session}>
      <MiPerfilPage user={session?.user as IUser} />
    </NavLayout>
  );
}
