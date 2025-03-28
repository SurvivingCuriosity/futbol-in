import { MiPerfilPage } from "@/client/features/MiPerfil/MiPerfilPage";
import { EstadoJugador } from "@/core/enum/Equipos/EstadoJugador";
import { authOptions } from "@/server/lib/authOptions";
import { IUserDocument } from "@/server/models/User/User.model";
import { EquipoService } from "@/server/services/Equipo/EquipoService";
import { UserService } from "@/server/services/User/UserService";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/not-allowed");
  }
  
  const fullUser = await UserService.findById(session.user.id);

  if(!fullUser){
    redirect("/not-allowed");
  }
  
  const equipos = await EquipoService.findManyById(fullUser?.equipos)

  const equiposAceptados = equipos.filter((equipo) => {
    const jugador = equipo.jugadores.find(
      (j) => j.usuario === fullUser.id
    );
    return jugador?.estado === EstadoJugador.ACEPTADO;
  });

  return (<MiPerfilPage user={UserService.mapToDTO(fullUser as IUserDocument)} equipos={equiposAceptados} />);
}
