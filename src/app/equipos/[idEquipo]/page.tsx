import { DetalleEquipoPage } from "@/client/features/Equipos/DetalleEquipoPage";
import { UserDTO } from "@/server/models/User/UserDTO";
import { EquipoService } from "@/server/services/Equipo/EquipoController";
import { UserService } from "@/server/services/User/UserService";

interface PageProps {
  params: Promise<{
    idEquipo: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { idEquipo } = await params;

  const equipo = await EquipoService.findById(idEquipo);

  const creador = await UserService.findById(equipo.createdByUserId);

  if (!creador) {
    return <div>Error al encontrar al creador del torneo</div>;
  }

  let companero: UserDTO | null = null;

  if (equipo.jugadores) {
    if (equipo.jugadores[0].usuario) {
      console.log(equipo.jugadores[0]);
      const companeroDocument = await UserService.findById(
        equipo.jugadores[0].usuario
      );
      if (companeroDocument) {
        companero = UserService.mapToDTO(companeroDocument);
      }
    }
  }

  return (
    <DetalleEquipoPage
      equipo={equipo}
      creador={UserService.mapToDTO(creador)}
      companero={companero}
    />
  );
}
