import { ConfirmarInscripcionPage } from "@/client/features/Competiciones/common/ConfirmarInscripcion/ConfirmarInscripcionPage";
import { LoginRegister } from "@/client/shared/components/Nav/components/LoginRegister";
import { authOptions } from "@/server/lib/authOptions";
import { CompeticionesService } from "@/server/services/Competiciones/CompeticionesService";
import { TorneosService } from "@/server/services/Competiciones/Torneos/TorneosService";
import { EquipoService } from "@/server/services/Equipo/EquipoService";
import { UserService } from "@/server/services/User/UserService";
import { getServerSession, Session } from "next-auth";
import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{
    idTorneo: string;
  }>;
}

const page = async ({ params }: PageProps) => {
  const { idTorneo } = await params;
  const session = (await getServerSession(authOptions)) as Session;

  if (!session || !session.user) {
    return (
      <div className="mx-auto p-10">
        <LoginRegister expanded />
      </div>
    );
  }

  const userDb = await UserService.findById(session.user.id);

  if (!userDb) {
    return (
      <div className="mx-auto p-10">
        <LoginRegister expanded />
      </div>
    );
  }

  const competicion = await TorneosService.getById(idTorneo);

  const equiposUsuario = await EquipoService.findManyById(userDb.equipos);

  const equipoInscrito = await CompeticionesService.getEquipoInscrito(
    idTorneo,
    userDb.id
  );

  if (equipoInscrito !== undefined) {
    redirect(`/competitivo/torneos/${idTorneo}`);
  }

  return (
    <ConfirmarInscripcionPage
      idCompeticion={idTorneo}
      equiposUsuario={equiposUsuario}
      equipoInscrito={equipoInscrito}
      tipoInscripcion={competicion.tipoInscripcion}
    />
  );
};

export default page;
