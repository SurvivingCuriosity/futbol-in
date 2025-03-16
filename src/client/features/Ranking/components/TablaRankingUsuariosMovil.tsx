"use client";

import { UsuarioEnRanking } from "./TablaRankingUsuarios";

export default function TablaRankingUsuariosMovil({
  users,
}: {
  users: UsuarioEnRanking[];
}) {
  return (
    <ul className="space-y-1">
      {users.map((user) => (
        <li key={user.id}>
          <div className="flex items-center gap-2 p-2 px-4 justify-between border rounded-lg relative border-neutral-700">
            <span className="flex items-center gap-2">
              <p className="size-7 bg-neutral-800 flex items-center justify-center rounded-full">
                #{user.posicion}
              </p>
              <p>{user.usuario}</p>
            </span>
            <p className="text-sm text-neutral-400">{user.puntuacion} pts</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
