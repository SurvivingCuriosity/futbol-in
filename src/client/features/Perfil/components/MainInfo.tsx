import { UserDTO } from "futbol-in-core/types";
import { ImagenPerfil } from "./ImagenPerfil";
import { MarcaVerificado } from "./MarcaVerificado";
import { ChipPosicionJugador } from "@/client/shared/components/ChipPosicionJugador";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

export const MainInfo = ({ user }: { user: UserDTO }) => {
  return (
    <div className="flex flex-col mx-auto items-start md:gap-4 w-full min-w-xs max-w-lg relative">
      <MarcaVerificado user={user} />
      <div className="flex items-center gap-2 mb-2">
        <ImagenPerfil user={user} />
        <div>
          <p className="font-bold text-3xl text-primary">{user.name}</p>
          {user.nombre && (
            <p className="text-sm text-neutral-500">{user.nombre}</p>
          )}
          {user.posicion && (
            <div className="flex items-center gap-2">
              <ChipPosicionJugador posicion={user.posicion} />
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-row my-4 items-center gap-2 justify-between w-full">
        {user.ciudad && (
          <div className="flex items-center gap-2 text-neutral-300">
            <FontAwesomeIcon icon={faLocationDot} />
            <p className="text-xs">{user.ciudad.split(",")[0]}</p>
          </div>
        )}
        {user.createdAt && (
          <p className="text-xs text-neutral-400">
            Miembro desde {new Date(user.createdAt)?.toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
};
