"use client";

import { UsuarioEnRanking } from "futbol-in-core/types";
import Link from "next/link";

export default function TablaRankingUsuariosMovil({
  users,
}: {
  users: UsuarioEnRanking[];
}) {
  return (
    <ul className="flex flex-col gap-1">
      {users.map((user,index) => (
        <Link href={`/user/${user.usuario}?from=competitivo/ranking`} key={user.id} className="animate-fade-in-top" style={{animationDelay: `${index * 0.1 + 0.5}s`}}>
          <div className="flex items-center gap-2 p-2 px-4 justify-between border rounded-lg relative border-neutral-700">
            <span className="flex items-center gap-2">
              <p className="size-7 bg-neutral-800 flex items-center justify-center rounded-full">
                #{user.posicion}
              </p>
              <p>{user.usuario}</p>
            </span>
            <p className="text-sm text-neutral-400">{user.puntuacion} pts</p>
          </div>
        </Link>
      ))}
    </ul>
  );
}
