"use client";

import { UserRole } from "@/core/enum/User/Role";
import { UserDTO } from "@/server/models/User/UserDTO";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";


export default function TarjetaUsuarioTopRanking({ user, posicion, puntuacion }: { user: UserDTO, posicion: number, puntuacion: number }) {
  const router = useRouter();

  const handleNavigateToUser = () => {
    router.push(`/user/${user.name}?from=competicion/ranking`);
  };

  return (
    <li
      className={`flex flex-row items-center h-24 gap-2 p-4 border rounded-lg relative border-primary/50 bg-primary/5`}
      onClick={handleNavigateToUser}
    >
      {user.role === UserRole.VERIFICADO && (
        <div className="bg-sky-600 absolute -top-1 -right-1 size-6 flex items-center justify-center rounded-full border-2 border-blue-300">
          <FontAwesomeIcon icon={faCheck} width={24} height={24} className="text-blue-200"/>
        </div>
      )}
      <div className="bg-neutral-700 size-14 rounded-full flex items-center justify-center relative">
        <div className="absolute -top-2 -left-2 text-sm font-bold text-black bg-primary rounded-full size-7 flex items-center justify-center">{`#${posicion}`}</div>
        {user?.name?.charAt(0).toUpperCase()}
      </div>
      <span>
        <p className="">{user?.name}</p>
        <p className="text-xl text-neutral-400 font-bold">{puntuacion} pts</p>
      </span>
    </li>
  );
}
