import { ConfirmarInscripcionPage } from "@/client/features/Competiciones/common/ConfirmarInscripcion/ConfirmarInscripcionPage";
import { LoginRegister } from "@/client/shared/components/Nav/components/LoginRegister";
import { TipoCompeticion } from "@/core/enum/Competicion/TipoCompeticion";
import { authOptions } from "@/server/lib/authOptions";
import { CompeticionesService } from "@/server/services/Competiciones/CompeticionesService";
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

  if(competicion === null) {
    return <p>Ups... esta competición no existe</p>
  }

  const equiposUsuario = await EquipoService.findManyById(userDb.equipos);

  const equipoInscrito = await CompeticionesService.getEquipoInscrito(idLiga, userDb.id)

  if(equipoInscrito !== undefined) {
    redirect(`/competitivo/ligas/${idLiga}`)
  }

  return (
    <ConfirmarInscripcionPage
      idCompeticion={idLiga}
      equiposUsuario={equiposUsuario}
      equipoInscrito={equipoInscrito}
      tipoInscripcion={competicion.tipoInscripcion}
      tipoCompeticion={TipoCompeticion.LIGA}
    />
  );
};

export default page;
