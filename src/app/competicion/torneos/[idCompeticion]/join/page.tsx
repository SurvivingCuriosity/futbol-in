import { ConfirmarInscripcionPage } from "@/client/features/Torneos/ConfirmarInscripcion/ConfirmarInscripcionPage";
import { authOptions } from "@/server/lib/authOptions";
import { CompeticionesService } from "@/server/services/Competiciones/CompeticionesService";
import { EquipoService } from "@/server/services/Equipo/EquipoService";
import { UserService } from "@/server/services/User/UserService";
import { getServerSession, Session } from "next-auth";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{
    idCompeticion: string;
  }>;
}

const page = async ({ params }: PageProps) => {
  const { idCompeticion } = await params;
  const session = (await getServerSession(authOptions)) as Session;

  if (!session || !session.user) {
    redirect("/not-allowed");
  }

  const userDb = await UserService.findById(session.user.id);

  if (!userDb) {
    signOut();
    redirect("/");
  }

  const competicion = await CompeticionesService.getById(idCompeticion);
  const equiposUsuario = await EquipoService.findManyById(userDb.equipos);

  return (
    <ConfirmarInscripcionPage
      competicion={competicion}
      equiposUsuario={equiposUsuario}
    />
  );
};

export default page;
