import React from "react";
import HomePage from "./HomePage";
import { NotificacionesService } from "@/server/services/Notificaciones/NotificacionesService";
import { UserDTO } from "@/server/models/User/UserDTO";
import { INotificaciones } from "@/core/types/Notificaciones/INotificaciones";
import { signOut } from "next-auth/react";

const HomePageContainer = async ({ user }: { user: UserDTO | undefined }) => {

  if(!user){
    signOut()
  }

  const equiposPendientes = await NotificacionesService.getInvitacionesAEquipos(
    user?.id || ""
  );

  const notificaciones:INotificaciones = {
    equiposPendientes,
  };

  const tieneNotificaciones = notificaciones.equiposPendientes.length > 0;

  return <HomePage tieneNotificaciones={tieneNotificaciones} notificaciones={notificaciones} />;
};

export default HomePageContainer;
