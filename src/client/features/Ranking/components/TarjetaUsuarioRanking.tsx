"use client";

import { esUsuarioVerificado } from "@/core/helpers/esUsuarioVerificado";
import { UserDTO } from "@/server/models/User/UserDTO";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";


export default function TarjetaUsuarioRanking({ user }: { user: UserDTO }) {
  const router = useRouter();

  const handleNavigateToUser = () => {
    router.push(`/user/${user.name}`);
  };

  return (
    <li
      className="flex flex-row items-center gap-2 p-4 border border-neutral-700 rounded-lg relative h-20"
      onClick={handleNavigateToUser}
    >
      {esUsuarioVerificado(user) && (
        <div className="bg-sky-600 absolute -top-1 -left-1 size-6 flex items-center justify-center rounded-full border-2 border-blue-300">
          <FontAwesomeIcon icon={faCheck} width={24} height={24} className="text-blue-200"/>
        </div>
      )}
      <div className="bg-neutral-700 size-9 rounded-full flex items-center justify-center">
        {user?.name?.charAt(0).toUpperCase()}
      </div>
      <span>
        <p>{user?.name}</p>
        <p className="text-sm text-neutral-400">{user.email}</p>
      </span>
    </li>
  );
}
