import { UserDTO } from "@/server/models/User/UserDTO";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

export const ImagenPerfil = ({ user }: { user: UserDTO }) => {
  return user.imagen === "" ? (
    <FontAwesomeIcon icon={faUserCircle} className="text-neutral-700 size-8" />
  ) : (
    <Image
      src={user.imagen || "/default_user.svg"}
      alt="avatar"
      width={100}
      height={100}
      style={{
        width: 100,
        height: 100,
      }}
      className="w-full h-full rounded-full border-2 border-primary"
    />
  );
};
