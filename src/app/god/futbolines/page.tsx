import { ListaFutbolinesGod } from "@/client/features/God/ListaFutbolinesGod";
import { esGod } from "@/core/helpers/esGod";
import { authOptions } from "@/server/lib/authOptions";
import { SpotService } from "@/server/services/Spots/SpotsService";
import { getServerSession } from "next-auth";

const page = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user || !esGod(user)) {
    return <div>No tienes permisos para acceder a esta página</div>;
  }
  const futbolines = await SpotService.getAll()
  return <ListaFutbolinesGod futbolines={futbolines} />;
};

export default page;
