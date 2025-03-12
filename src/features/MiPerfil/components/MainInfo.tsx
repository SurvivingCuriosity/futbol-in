import { UserDTO } from "@/shared/models/User/UserDTO";
import { Button } from "futbol-in-ui";
import { ImagenPerfil } from "./ImagenPerfil";
import { MarcaVerificado } from "./MarcaVerificado";

export const MainInfo = ({ user }: { user: UserDTO }) => {
  return (
    <div className="flex flex-col md:flex-row mx-auto items-center md:gap-4 w-full md:w-fit">
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
      <span className="flex items-center gap-2 w-full mt-4">
        <Button label="Editar perfil" size="sm" />
        <Button label="Ajustes" size="sm" variant="neutral-outline" />
      </span>
    </div>
  );
};
