import { ImagenCuadrada } from "@/client/shared/components/ImagenCuadrada";
import { useUser } from "@/client/shared/context/UserContext";
import { UserDTO } from "futbol-in-core/types";

export const Header = ({
  user
}: {
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
          <ImagenCuadrada src={imageUrl} size="md" alt="Imagen de perfil" />
          <div>
            <p className="text-neutral-500 leading-3 text-xs">Bienvenido,</p>
            <p className="text-lg font-bold">
              {user.name.charAt(0).toUpperCase() +
                user.name.slice(1).toLowerCase()}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
