"use client";

import { UserRole } from "@/shared/enum/User/Role";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

// @ts-expect-error qwe
export default function TarjetaUsuarioRanking({ user }: { user: IUser }) {
  const router = useRouter();

  const handleNavigateToUser = () => {
    router.push(`/user/${user.name}`);
  };

  return (
    <li
      className="flex flex-row items-center gap-2 p-4 border border-neutral-700 rounded-lg relative"
      onClick={handleNavigateToUser}
    >
      {user.role === UserRole.VERIFICADO && (
        <div className="bg-sky-600 absolute -top-1 -right-1 size-6 flex items-center justify-center rounded-full border-2 border-blue-300">
          <FontAwesomeIcon icon={faCheck} width={24} height={24} className="text-blue-200"/>
        </div>
      )}
      <div className="bg-neutral-700 size-9 rounded-full flex items-center justify-center">
        {user.name.charAt(0).toUpperCase()}
      </div>
      <span>
        <p>{user.name}</p>
        <p className="text-sm text-neutral-400">{user.email}</p>
      </span>
    </li>
  );
}
