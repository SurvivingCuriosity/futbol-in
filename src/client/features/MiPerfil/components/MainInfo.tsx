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
    <div className="flex flex-col mx-auto items-center md:gap-4 w-full min-w-xs max-w-lg">
      <ImagenPerfil imagenUrl={imageUrl} />

      <span className="flex flex-row items-start md:flex-col">
        <MarcaVerificado user={user} />
        <span className="flex flex-col gap-1 items-center">
          <p className="font-bold text-3xl text-primary">{user.name}</p>
          {user.nombre && (
            <p className="text-sm text-neutral-500">{user.nombre}</p>
          )}
          {user.ciudad && (
            <div className="flex items-center gap-2 my-2 mb-4 text-neutral-300">
              <FontAwesomeIcon icon={faLocationDot} />
              <p className="text-xs">{user.ciudad.split(",")[0]}</p>
              <p className="text-xs text-neutral-600">
                ({user.ciudad.split(",")[1].trim()})
              </p>
            </div>
          )}
          {user.posicion && (
            <div className="flex items-center gap-2 my-2 mb-4">
              <ChipPosicionJugador posicion={user.posicion} />
            </div>
          )}
          {user.createdAt && (
            <p className="text-xs text-neutral-400">
              Miembro desde {new Date(user.createdAt)?.toLocaleDateString()}
            </p>
          )}
          {esOperador(user) && (
            <p className="text-sm text-neutral-500">Operador</p>
          )}
        </span>
      </span>
      <span className="flex items-center gap-2 w-full mt-4">
        {esOperador(user) && (
          <BotonPerfilOperador user={user}/>
        )}
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
    </div>
  );
};
