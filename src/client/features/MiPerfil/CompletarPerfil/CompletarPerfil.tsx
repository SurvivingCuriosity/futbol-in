import { UserClient } from "@/client/shared/client/UserClient";
import { Posicion } from "@/core/enum/Posicion/Posicion";
import { UserDTO } from "@/server/models/User/UserDTO";
import { useEffect, useState } from "react";
import { CompletarCiudad } from "./steps/CompletarCiudadActual";
import { CompletarNombre } from "./steps/CompletarNombre";
import { CompletarPosicion } from "./steps/CompletarPosicion";
import { CompletarTelefono } from "./steps/CompletarTelefono";
import { TarjetaCompletarPerfil } from "./TarjetaCompletarPerfil";
import { haCompletadoElPerfil } from "./utils/haCompletadoElPerfil";

export const CompletarPerfil = ({
  user,
  onUpdateUser,
}: {
  user: UserDTO;
  onUpdateUser: (nuevoUser: UserDTO) => void;
}) => {
  const [nombreDone, setNombreDone] = useState(user.nombre !== null);
  const [posicionDone, setPosicionDone] = useState(user.posicion !== null);
  const [telefonoDone, setTelefonoDone] = useState(user.telefono !== null);
  const [ciudadDone, setCiudadDone] = useState(user.ciudadActual !== null);

  const [allDone, setAllDone] = useState(
    nombreDone && posicionDone && telefonoDone && ciudadDone
  );

  useEffect(() => {
    setAllDone(nombreDone && posicionDone && telefonoDone && ciudadDone);
  }, [nombreDone, posicionDone, telefonoDone, ciudadDone]);

  const handleUpdateNombre = async (nuevoNombre: string | null) => {
    const res = await UserClient.updateUser({ ...user, nombre: nuevoNombre });
    if (res.success) {
      setNombreDone(true);
    }
    if (res.updatedUser) {
      onUpdateUser(res.updatedUser);
    }
  };

  const handleUpdatePosicion = async (nuevaPosicion: Posicion | null) => {
    const res = await UserClient.updateUser({
      ...user,
      posicion: nuevaPosicion,
    });
    if (res.success) {
      setPosicionDone(true);
    }
    if (res.updatedUser) {
      onUpdateUser(res.updatedUser);
    }
  };

  const handleUpdateTelefono = async (nuevoTelefono: string | null) => {
    const res = await UserClient.updateUser({
      ...user,
      telefono: nuevoTelefono,
    });
    if (res.success) {
      setTelefonoDone(true);
    }
    if (res.updatedUser) {
      onUpdateUser(res.updatedUser);
    }
  };

  const handleUpdateCiudadActual = async (nuevaCiudad: string | null) => {
    const res = await UserClient.updateUser({
      ...user,
      ciudadActual: nuevaCiudad,
      ciudad: nuevaCiudad,
    });
    if (res.success) {
      setCiudadDone(true);
    }
    if (res.updatedUser) {
      onUpdateUser(res.updatedUser);
    }
  };

  if (!user || haCompletadoElPerfil(user) || allDone) {
    return null;
  }

  return (
    <div className="rounded-lg">
      <p>{`Completa tu perfil`}</p>
      <ul className="flex space-x-2 overflow-x-auto overflow-y-visible my-2 pb-2 snap-x snap-mandatory">
        {!nombreDone && (
          <TarjetaCompletarPerfil titulo="¿Cómo te llamas?">
            <CompletarNombre onSubmit={handleUpdateNombre} />
          </TarjetaCompletarPerfil>
        )}

        {!posicionDone && (
          <TarjetaCompletarPerfil titulo="Posición favorita">
            <CompletarPosicion onSubmit={handleUpdatePosicion} />
          </TarjetaCompletarPerfil>
        )}

        {!telefonoDone && (
          <TarjetaCompletarPerfil titulo="Número de teléfono">
            <CompletarTelefono onSubmit={handleUpdateTelefono} />
          </TarjetaCompletarPerfil>
        )}

      </ul>
        {!ciudadDone && (
          <TarjetaCompletarPerfil titulo="Tu ciudad">
            <CompletarCiudad onSubmit={handleUpdateCiudadActual} />
          </TarjetaCompletarPerfil>
        )}
    </div>
  );
};
