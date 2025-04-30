import { ChipPosicionJugador } from "@/client/shared/components/ChipPosicionJugador";
import { useUser } from "@/client/shared/context/UserContext";
import { UserDTO } from "@/server/models/User/UserDTO";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "futbol-in-ui";
import { useRouter } from "next/navigation";
import { ImagenPerfil } from "./ImagenPerfil";
import { MarcaVerificado } from "./MarcaVerificado";
import { esOperador } from "@/core/helpers/esOperador";
import { BotonPerfilOperador } from "./BotonPerfilOperador";

export const MainInfo = ({ user }: { user: UserDTO }) => {
  const router = useRouter();

  const { imageUrl } = useUser();

  return (
    <>
      <div className="flex flex-col mx-auto items-start md:gap-4 w-full min-w-xs max-w-lg border-b border-primary">
        <MarcaVerificado user={user} />
        <div className="flex items-center gap-2 mb-2">
          <ImagenPerfil imagenUrl={imageUrl} />
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

      <span className="flex flex-col items-center gap-2 w-full">
        <span className="flex items-center gap-2 w-full">
          <Button
            label="Editar perfil"
            size="sm"
            onClick={() => router.push("/perfil/editar?from=perfil")}
          />
          <Button
            label="Ajustes"
            size="sm"
            variant="neutral-outline"
            onClick={() => router.push("/ajustes?from=perfil")}
          />
        </span>
        {esOperador(user) && <BotonPerfilOperador user={user} />}
      </span>
    </>
  );
};
