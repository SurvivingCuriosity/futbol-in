"use client";

import { LOGROS_DISPONIBLES } from "@/shared/constants/LogrosDisponibles";
import { UserRole } from "@/shared/enum/User/Role";
import { UserDTO } from "@/shared/models/User/UserDTO";
import {
  faCheck,
  faTrophy,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "futbol-in-ui";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { ProgresoLogro } from "./components/ProgresoLogro";

export interface MiPerfilPageProps {
  user: UserDTO;
}

export const MiPerfilPage = (props: MiPerfilPageProps) => {
  const { user } = props;

  const futbolinesAgregados = user.stats.lugaresAgregados;
  const futbolinesRevisados = user.stats.lugaresRevisados;

  return (
    <div className="w-full h-full md:gap-8 justify-between flex flex-col space-y-8 md:space-y-0 md:flex-row md:border border-neutral-700 rounded-lg md:p-8">
      <div className="min-w-3xs">
        <span className="flex flex-row items-center gap-2 md:flex-col">
          <span className="relative">
            {user.role === UserRole.VERIFICADO && (
              <div className="bg-sky-600 absolute top-0 right-0 size-6 flex items-center justify-center rounded-full border-2 border-white">
                <FontAwesomeIcon icon={faCheck} width={24} height={24} />
              </div>
            )}

            {user.imagen === "" ? (
              <FontAwesomeIcon
                icon={faUserCircle}
                className="text-neutral-700 size-8"
              />
            ) : (
              <Image
                src={user.imagen || '/default_user.svg'}
                alt="avatar"
                width={52}
                height={52}
                style={{
                  width: 52,
                  height: 52,
                }}
                className="w-full h-full rounded-full size-8"
              />
            )}
          </span>
          <span className="flex flex-col gap-1">
            <p className="font-bold">{user.name}</p>
            <p className="text-xs text-neutral-400">{user.email}</p>
            <p className="text-xs text-neutral-400">
              {user.createdAt?.toLocaleDateString()}
            </p>
          </span>
        </span>

        <div className="flex flex-row flex-wrap gap-2 w-full mt-4">
          <div className="rounded-2xl flex w-min whitespace-nowrap items-center gap-1 bg-blue-500/20 px-2 p-1 text-neutral-400">
            <FontAwesomeIcon
              icon={faTrophy}
              className="text-blue-500 rounded-full"
            />
            <p className="text-xs">{futbolinesAgregados} futbolines agregados</p>
          </div>
          <div className="rounded-2xl flex w-min whitespace-nowrap items-center gap-1 bg-purple-500/20 px-2 p-1 text-neutral-400">
            <FontAwesomeIcon
              icon={faTrophy}
              className="text-purple-500 rounded-full"
            />
            <p className="text-xs">{futbolinesRevisados} futbolines revisados</p>
          </div>
        </div>
      </div>

      <div className="grow">
        <div className="space-y-4">
          <ProgresoLogro 
            logro={LOGROS_DISPONIBLES[0]}
            value={futbolinesAgregados}
          />
        </div>
        <Link href={'/logros'} className="text-right block text-sm text-neutral-500 mt-2 underline underline-offset-2">Ver todos los logros disponibles</Link> 
      </div>

      <Button
        variant="danger-outline"
        onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
        label="Cerrar sesión"
      />
    </div>
  );
};
