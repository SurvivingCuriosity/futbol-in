import { UserDTO } from "@/server/models/User/UserDTO";
import { ImagenPerfil } from "./ImagenPerfil";
import { MarcaVerificado } from "./MarcaVerificado";


export const MainInfo = ({ user }: { user: UserDTO }) => {

  return (
    <div className="flex flex-col mx-auto items-center md:gap-4 w-full md:w-fit min-w-xs">
      <ImagenPerfil user={user} />

      <span className="flex flex-row items-start md:flex-col">
        <MarcaVerificado user={user} />
        <span className="flex flex-col gap-1 items-center">
          <p className="font-bold text-3xl text-primary">{user.name}</p>
          {/* <p>{user.email}</p> */}
          <p className="text-xs text-neutral-400">
            Miembro desde {user.createdAt?.toLocaleDateString()}
          </p>
        </span>
      </span>
    </div>
  );
};
