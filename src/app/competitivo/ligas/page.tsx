import { ListaLigasProvider } from "@/client/features/Competiciones/Ligas/ListaLigas/ListaLigasContext";
import { ListaLigasPage } from "@/client/features/Competiciones/Ligas/ListaLigas/ListaLigasPage";
import { decodeCiudad } from "futbol-in-core/helpers";
import { authOptions } from "@/server/lib/authOptions";
import { LigasService } from "@/server/services/Competiciones/Ligas/LigasService";
import { EquipoService } from "@/server/services/Equipo/EquipoService";
import { Types } from "mongoose";
import { getServerSession } from "next-auth";

const page = async () => {
  const session = await getServerSession(authOptions)
  const user = session?.user
  
  const ligas = await LigasService.getLigasDeCiudad(decodeCiudad(user?.ciudadActual || '') || '');
  const equiposUsuario = await EquipoService.findManyById(user?.equipos?.map(e => new Types.ObjectId(e)));
  
  return (
    <ListaLigasProvider value={{ ligas, loggedInUser: user, equiposUsuario }}>
      <ListaLigasPage />
    </ListaLigasProvider>
  );
};

export default page;
