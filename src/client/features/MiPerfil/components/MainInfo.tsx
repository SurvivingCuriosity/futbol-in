import { UserDTO } from "@/server/models/User/UserDTO";
import { Button } from "futbol-in-ui";
import { ImagenPerfil } from "./ImagenPerfil";
import { MarcaVerificado } from "./MarcaVerificado";
import { useRouter } from "next/navigation";


export const MainInfo = ({ user }: { user: UserDTO }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col mx-auto items-center md:gap-4 w-full md:w-fit min-w-xs">
      <ImagenPerfil user={user} />

      <span className="flex flex-row items-start md:flex-col">
        <MarcaVerificado user={user} />
        <span className="flex flex-col gap-1 items-center">
          <p className="font-bold text-3xl text-primary">{user.name}</p>
          <p>{user.email}</p>
          <p className="text-xs text-neutral-400">
            Miembro desde {user.createdAt?.toLocaleDateString()}
          </p>
        </span>
      </span>
      <span className="flex items-center gap-2 w-full mt-4 max-w-xs">
        <Button label="Editar perfil" size="sm" onClick={() => router.push("/perfil/editar?from=perfil")} />
        <Button label="Ajustes" size="sm" variant="neutral-outline" onClick={() => router.push("/ajustes?from=perfil")} />
      </span>
    </div>
  );
};
