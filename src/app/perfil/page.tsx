import { MiPerfilPage } from "@/features/MiPerfil/MiPerfilPage";
import { authOptions } from "@/shared/lib/authOptions";
import { UserDTO } from "@/shared/models/User/UserDTO";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/not-allowed");
  }

  return <MiPerfilPage user={session?.user as UserDTO} />;
}
