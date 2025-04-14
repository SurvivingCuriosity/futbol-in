import { useUser } from "@/client/shared/context/UserContext";
import { INotificaciones } from "@/core/types/Notificaciones/INotificaciones";
import { UserDTO } from "@/server/models/User/UserDTO";
import Image from "next/image";
import { BotonNotificaciones } from "../Notificaciones/BotonNotificaciones";
import { HeaderLocation } from "./HeaderLocation";

export const Header = ({
  tieneNotificaciones,
  notificaciones,
  user
}: {
  tieneNotificaciones: boolean;
  notificaciones: INotificaciones;
  user:UserDTO|undefined
}) => {

  const { imageUrl } = useUser();

  if (!user) {
    return null;
  }

  return (
    <header className="flex flex-col border-b border-neutral-700 pb-2 mb-2">
      <div className="flex items-center justify-between pb-1">
        <div className="flex items-center gap-2">
          <Image
            src={imageUrl || "/default_user.svg"}
            width={45}
            height={45}
            alt="Imagen de perfil"
            className="rounded-full"
          />
          <div>
            <p className="text-neutral-500 leading-3 text-xs">Bienvenido,</p>
            <p className="text-lg font-bold">
              {user.name.charAt(0).toUpperCase() +
                user.name.slice(1).toLowerCase()}
            </p>
          </div>
        </div>
        <BotonNotificaciones
          tieneNotificaciones={tieneNotificaciones}
          notificaciones={notificaciones}
        />
      </div>
     <HeaderLocation />
    </header>
  );
};
