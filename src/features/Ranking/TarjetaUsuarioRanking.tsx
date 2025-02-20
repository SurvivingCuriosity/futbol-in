"use client"

import { useRouter } from "next/navigation";

// @ts-expect-error qwe
export default function TarjetaUsuarioRanking({ user }) {
  const router = useRouter();

  const handleNavigateToUser = () => {
    router.push(`/user/${user.name}`);
  };

  return (
    <li
      className="flex flex-row items-center gap-2 p-4 border border-neutral-700 rounded-lg"
      onClick={handleNavigateToUser}
    >
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
