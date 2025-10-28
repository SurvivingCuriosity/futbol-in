import { MiPerfilPage } from "@/client/features/MiPerfil/MiPerfilPage";
import { authOptions } from "@/server/lib/authOptions";
import { IUserDocument } from "@/server/models/User/User.model";
import { SpotService } from "@/server/services/Spots/SpotsService";
import { UserService } from "@/server/services/User/UserService";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/not-allowed");
  }

  const fullUser = await UserService.findById(session.user.id);

  if (!fullUser) {
    redirect("/not-allowed");
  }

  const futbolines = await SpotService.getSpotsDeUsuario(fullUser.id);

  return (
    <MiPerfilPage
      user={UserService.mapToDTO(fullUser as IUserDocument)}
      futbolines={futbolines}
    />
  );
}
