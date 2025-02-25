import { PerfilPage } from "@/features/Perfil/PerfilPage";
import { NavLayout } from "@/shared/components/NavLayout/NavLayout";
import { authOptions } from "@/shared/lib/authOptions";
import { UserService } from "@/shared/services/User/UserService";
import { getServerSession } from "next-auth";

interface PageProps {
  params: Promise<{
    username: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { username } = await params;

  const session = await getServerSession(authOptions);

  const userDoc = await UserService.findByUsername(username)

  if (!userDoc) {
    return (
      <NavLayout loggedIn={!!session}>
        <div className="text-center p-10">Usuario no encontrado</div>
      </NavLayout>
    );
  }

  const user = UserService.mapToDTO(userDoc);

  return (
    <NavLayout loggedIn={!!session}>
      <PerfilPage user={user} />
    </NavLayout>
  );
}
