import { MiPerfilPage } from "@/features/MiPerfil/MiPerfilPage";
import { authOptions } from "@/shared/lib/authOptions";
import { IUserDocument } from "@/shared/models/User/User.model";
import { UserService } from "@/shared/services/User/UserService";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/not-allowed");
  }
  
  const fullUser = await UserService.findById(session.user.id);
  
  return <MiPerfilPage user={UserService.mapToDTO(fullUser as IUserDocument)} />;
}
