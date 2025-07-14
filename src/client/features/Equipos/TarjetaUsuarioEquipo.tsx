import { StorageClient } from "@/client/shared/client/StorageClient";
import { ChipPosicionJugador } from "@/client/shared/components/ChipPosicionJugador";
import { EstadoJugador, Posicion } from "futbol-in-core/enum";
import { UserDTO } from "futbol-in-core/types";
import Image from "next/image";
import { useEffect, useState } from "react";

export const TarjetaUsuarioEquipo = ({
  user,
  nombre,
  estado,
}: {
  user?: UserDTO;
  nombre?: string;
  estado: EstadoJugador;
}) => {
  const [imagenUrl, setImagenUrl] = useState<string>("");

  useEffect(() => {
    getUserImage();
  }, []);

  async function getUserImage() {
    if (!user) return;
    const url = await StorageClient.getImageUrl(user.imagen);
    setImagenUrl(url);
  }

  return (
    <div className="border border-neutral-700 p-2 rounded-lg flex items-center gap-2 w-full relative">
      <Image
        src={imagenUrl || "/default_user.svg"}
        alt="avatar"
        width={40}
        height={40}
        className="rounded-full object-center object-cover size-2xl"
      />
      <div className="flex flex-col items-start gap-1">
        <p className="ml-1">{user?.name || nombre}</p>
        <ChipPosicionJugador posicion={user?.posicion || Posicion.POLIVALENTE} />
      </div>
      {estado === EstadoJugador.PENDIENTE && (
        <span className="absolute top-1 right-1 text-neutral-400 text-xs">
          Pendiente
        </span>
      )}
    </div>
  );
};
