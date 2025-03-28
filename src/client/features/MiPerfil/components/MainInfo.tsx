import { useUser } from "@/client/shared/context/UserContext";
import { UserDTO } from "@/server/models/User/UserDTO";
import { faGun, faShieldHalved } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "futbol-in-ui";
import { useRouter } from "next/navigation";
import { ImagenPerfil } from "./ImagenPerfil";
import { MarcaVerificado } from "./MarcaVerificado";

export const MainInfo = ({ user }: { user: UserDTO }) => {
  const router = useRouter();

  const {imageUrl} = useUser()

  return (
    <div className="flex flex-col mx-auto items-center md:gap-4 w-full md:w-fit min-w-xs">
      <ImagenPerfil imagenUrl={imageUrl} />

      <span className="flex flex-row items-start md:flex-col">
        <MarcaVerificado user={user} />
        <span className="flex flex-col gap-1 items-center">
          <p className="font-bold text-3xl text-primary">{user.name}</p>
          <p className="text-sm text-neutral-500">Fernando Rodríguez</p>
          <div className="flex items-center gap-2 my-2 mb-4">
            <div className="text-xs text-blue-400 bg-blue-500/20 w-fit p-1 flex items-center gap-1 px-2 rounded-2xl">
              <FontAwesomeIcon icon={faShieldHalved} />
              Portero
            </div>
            <div className="text-xs text-red-400 bg-red-500/20 w-fit p-1 flex items-center gap-1 px-2 rounded-2xl">
              <FontAwesomeIcon icon={faGun} />
              Delantero
            </div>
          </div>
          <p className="text-xs text-neutral-400">
            Miembro desde {user.createdAt?.toLocaleDateString()}
          </p>
        </span>
      </span>
      <span className="flex items-center gap-2 w-full mt-4 max-w-xs">
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
