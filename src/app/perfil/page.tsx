import { NavLayout } from "@/shared/components/NavLayout/NavLayout";
import { MiPerfilPage } from "@/features/MiPerfil/MiPerfilPage";
import { authOptions } from "@/shared/lib/authOptions";
import { UserDTO } from "@/shared/models/User/UserDTO";
import { getServerSession } from "next-auth";

export default async function page() {
  const session = await getServerSession(authOptions);

  return (
    <NavLayout loggedIn={!!session}>
      <MiPerfilPage user={session?.user as UserDTO} />
    </NavLayout>
  );
}
