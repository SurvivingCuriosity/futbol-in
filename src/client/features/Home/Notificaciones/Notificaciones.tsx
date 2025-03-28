import { INotificaciones } from "@/core/types/Notificaciones/INotificaciones";
import React from "react";
import { NotificacionEquipoPendiente } from "./NotificacionEquipoPendiente";

export const Notificaciones = ({
  notificaciones,
}: {
  notificaciones: INotificaciones;
}) => {

    
  return (
    <div>
      <p className="text-primary text-2xl">Notificaciones</p>
      {notificaciones.equiposPendientes.map(equipo => (
        <NotificacionEquipoPendiente equipo={equipo} key={equipo.id} />
      ))}
    </div>
  );
};
