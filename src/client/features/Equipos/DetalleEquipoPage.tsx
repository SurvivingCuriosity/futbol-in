"use client";

import { EquiposClient } from "@/client/shared/client/EquiposClient";
import { useUser } from "@/client/shared/context/UserContext";
import { useGetLoggedInUserClient } from "@/client/shared/hooks/useGetLoggedInUserClient";
import { GoBackLayout } from "@/client/shared/layouts/GoBackLayout";
import { EstadoJugador } from "futbol-in-core/enum";
import { EquipoDTO } from "futbol-in-core/types";
import { UserDTO } from "futbol-in-core/types";
import { Button } from "futbol-in-ui";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { TarjetaUsuarioEquipo } from "./TarjetaUsuarioEquipo";
import { TarjetaMensaje } from "@/client/shared/components/TarjetaMensaje";

export const DetalleEquipoPage = ({
  equipo,
  creador,
  jugadoresRegistrados,
  jugadoresNoRegistrados,
}: {
  equipo: EquipoDTO;
  creador: UserDTO | null;
  jugadoresRegistrados: Array<UserDTO&{estado:EstadoJugador}>;
  jugadoresNoRegistrados: Array<{nombre:string, estado:EstadoJugador}>;
}) => {
  const router = useRouter();

  const { imagenesEquipos } = useUser();

  const user = useGetLoggedInUserClient();
  const esElCreador = user?.id === equipo.createdByUserId;

  const handleDelete = async () => {
    const res = await EquiposClient.eliminarEquipo(equipo.id);
    if (res.success) {
      router.back();
    }
  };

  return (
    <GoBackLayout href="/perfil" className="max-w-lg mx-auto">
      <div className="flex flex-col items-start gap-4">
        <div className="flex flex-col items-center gap-2 mx-auto">
          <Image
            src={imagenesEquipos[equipo.id] || "/default_user.svg"}
            alt="Imagen de equipo"
            width={150}
            height={150}
            className="rounded-full size-24 object-center object-cover"
          />
          <h1 className="text-3xl font-black text-primary leading-4 mt-2">
            {equipo.nombreEquipo}
          </h1>
          <p className="text-xs text-neutral-500 mr-auto">
            Creado por {creador?.name}
          </p>
        </div>
        <TarjetaMensaje 
          variant="info"
          text="Ponte en contacto con soporte@futbolin.app o en nuestra cuenta de instagram para cambiar el nombre del equipo"
        />
        <div className="w-full">
          <p className="text-neutral-500 mb-1">Jugadores:</p>
          <div className="w-full space-y-1">
            {jugadoresRegistrados.map((jugador, index) => (
              <TarjetaUsuarioEquipo user={jugador} key={index} estado={jugador.estado}/>
            ))}
            {jugadoresNoRegistrados.map((jugador, index) => (
              <TarjetaUsuarioEquipo nombre={jugador.nombre} key={index} estado={jugador.estado}/>
            ))}
          </div>
        </div>
        {esElCreador && (
          <Button
            label="Eliminar equipo"
            variant="danger-outline"
            onClick={() => handleDelete()}
          />
        )}
      </div>
    </GoBackLayout>
  );
};
