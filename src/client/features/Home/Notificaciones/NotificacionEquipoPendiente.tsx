import { EquiposClient } from "@/client/shared/client/EquiposClient";
import { useGetLoggedInUserClient } from "@/client/shared/hooks/useGetLoggedInUserClient";
import { EstadoJugador } from "futbol-in-core/enum";
import { EquipoDTO } from "futbol-in-core/types";
import { Button } from "futbol-in-ui";
import { signOut } from "next-auth/react";
import React, { useState } from "react";
import { toast } from "react-toastify";

export const NotificacionEquipoPendiente = ({
  equipo,
}: {
  equipo: EquipoDTO;
}) => {
  const [loading, setLoading] = useState(false);
  const loggedInUser = useGetLoggedInUserClient();

  const jugadorQueInvita = equipo.jugadores.find(
    (j) => j.usuario !== loggedInUser?.id
  );

  const responderInvitacion = async (estado:EstadoJugador) => {
    setLoading(true)
    if(!loggedInUser) {
      toast.error('Ups... Debes iniciar sesión de nuevo')
      signOut()
      return
    }
    await EquiposClient.responderInvitacion({
      idEquipo: equipo.id,
      idJugador: loggedInUser?.id,
      estado
    })
    toast.success('Bienvenido al equipo!')
    setLoading(false)
  };


  return (
    <div className="border border-neutral-800 p-2 rounded-lg mt-2">
      <p className="text-neutral-500 text-sm mb-2">
        <span className="text-neutral-400 font-bold">{jugadorQueInvita?.nombre}</span> te ha invitado a unirte a{" "}
        <span className="text-neutral-400 font-bold">{equipo.nombreEquipo}</span>
      </p>
      <div className="flex items-center gap-2">
        <Button
          label="Rechazar"
          onClick={()=>responderInvitacion(EstadoJugador.RECHAZADO)}
          variant="outline"
          size="sm"
          loading={loading}
          disabled={loading}
        />
        <Button label="Unirme" onClick={()=>responderInvitacion(EstadoJugador.ACEPTADO)} size="sm" loading={loading} disabled={loading} />
      </div>
    </div>
  );
};
