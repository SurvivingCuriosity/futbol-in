import { ConfirmarInscripcionPage } from "@/client/features/Competiciones/Torneos/ConfirmarInscripcion/ConfirmarInscripcionPage";
import { LoginRegister } from "@/client/shared/components/Nav/components/LoginRegister";
import { authOptions } from "@/server/lib/authOptions";
import { LigasService } from "@/server/services/Competiciones/Ligas/LigasService";
import { EquipoService } from "@/server/services/Equipo/EquipoService";
import { UserService } from "@/server/services/User/UserService";
import { getServerSession, Session } from "next-auth";
import { redirect } from "next/navigation";


interface PageProps {
  params: Promise<{
    idLiga: string;
  }>;
}

const page = async ({ params }: PageProps) => {
  const { idLiga } = await params;
  const session = (await getServerSession(authOptions)) as Session;

  if (!session || !session.user) {
    return <div className="mx-auto p-10"><LoginRegister expanded/></div>
  }

  const userDb = await UserService.findById(session.user.id);

  if (!userDb) {
    return <div className="mx-auto p-10"><LoginRegister expanded/></div>
  }

  const competicion = await LigasService.getById(idLiga);

  const equiposUsuario = await EquipoService.findManyById(userDb.equipos);

  const equipoInscrito = await LigasService.getEquipoInscrito(idLiga, userDb.id)

  if(equipoInscrito !== undefined) {
    redirect(`/competitivo/torneos/${idLiga}`)
  }

  return (
    <ConfirmarInscripcionPage
      idCompeticion={idLiga}
      equiposUsuario={equiposUsuario}
      equipoInscrito={equipoInscrito}
      tipoInscripcion={competicion.tipoInscripcion}
    />
  );
};

export default page;
