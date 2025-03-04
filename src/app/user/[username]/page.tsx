import { PerfilPage } from "@/features/Perfil/PerfilPage";
import { NavLayout } from "@/shared/components/Layouts/NavLayout";
import { UserService } from "@/shared/services/User/UserService";

interface PageProps {
  params: Promise<{
    username: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { username } = await params;

  const userDoc = await UserService.findByUsername(username)

  if (!userDoc) {
    return (
      <NavLayout>
        <div className="text-center p-10">Usuario no encontrado</div>
      </NavLayout>
    );
  }

  const user = UserService.mapToDTO(userDoc);

  return (
    <PerfilPage user={user} />
  );
}
