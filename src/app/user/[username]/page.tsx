import { PerfilPage } from "@/client/features/Perfil/PerfilPage";
import { NavLayout } from "@/client/shared/layouts/NavLayout";
import { SpotService } from "@/server/services/Spots/SpotsService";
import { UserService } from "@/server/services/User/UserService";

interface PageProps {
  params: Promise<{
    username: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { username } = await params;

  const userDoc = await UserService.findByUsername(username);

  if (!userDoc) {
    return (
      <NavLayout>
        <div className="text-center p-10">Usuario no encontrado</div>
      </NavLayout>
    );
  }

  const user = UserService.mapToDTO(userDoc);
  const spots = await SpotService.getSpotsDeUsuario(user.id);

  return <PerfilPage user={user} spots={spots} />;
}
