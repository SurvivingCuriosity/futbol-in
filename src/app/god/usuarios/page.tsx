import { ListaUsuariosGod } from "@/client/features/God/ListaUsuariosGod";
import { esGod } from "@/core/helpers/esGod";
import { authOptions } from "@/server/lib/authOptions";
import { UserService } from "@/server/services/User/UserService";
import { getServerSession } from "next-auth";

const page = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user || !esGod(user)) {
    return <div>No tienes permisos para acceder a esta página</div>;
  }
  const usuarios = await UserService.getAll()
  return <ListaUsuariosGod usuarios={usuarios} />;
};

export default page;
