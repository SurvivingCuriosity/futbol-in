"use client";

import { Progress } from "@/packages/components/Progress";
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

export interface MiPerfilPageProps {
  user: UserDTO;
}

export const MiPerfilPage = (props: MiPerfilPageProps) => {
  const { user } = props;

  const futbolinesAgregados = user.stats.lugaresAgregados;

  return (
    <div className="w-full h-full gap-8 justify-between flex flex-col space-y-8 md:space-y-0 md:flex-row border border-neutral-700 rounded-lg p-3 md:p-8">
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
            <p className="text-sm">{futbolinesAgregados} futbolines</p>
          </div>
          {/* <div className="rounded-2xl flex w-min whitespace-nowrap items-center gap-1 bg-purple-500/20 px-2 p-1 text-neutral-400">
            <FontAwesomeIcon
              icon={faTrophy}
              className="text-purple-500 rounded-full"
            />
            <p className="text-sm">10 Futbolín</p>
          </div>
          <div className="rounded-2xl flex w-min whitespace-nowrap items-center gap-1 bg-amber-500/20 px-2 p-1 text-neutral-400">
            <FontAwesomeIcon
              icon={faTrophy}
              className="text-amber-500 rounded-full"
            />
            <p className="text-sm">10 Futbolín</p>
          </div> */}
        </div>
      </div>
      <div className="grow">
        <div className="flex flex-col md:flex-row items-start gap-4 w-full">
          <div className="p-4 w-full md:w-1/3 border border-neutral-500 rounded-lg flex flex-col items-center">
            <FontAwesomeIcon icon={faTrophy} className="text-primary" />
            <p>{futbolinesAgregados}</p>
            <p>Añadidos</p>
          </div>
          {/* <div className="p-4 w-full md:w-1/3 border border-neutral-500 rounded-lg flex flex-col items-center">
            <FontAwesomeIcon icon={faTrophy} className="text-primary" />
            <p>15</p>
            <p>Añadidos</p>
          </div>
          <div className="p-4 w-full md:w-1/3 border border-neutral-500 rounded-lg flex flex-col items-center">
            <FontAwesomeIcon icon={faTrophy} className="text-primary" />
            <p>15</p>
            <p>Añadidos</p>
          </div> */}
        </div>
        <p className="my-4">Logros</p>
        <div className="space-y-4">
          <div className="flex flex-row border border-neutral-600 rounded-lg p-4 items-center gap-4">
            <FontAwesomeIcon
              icon={faTrophy}
              className="text-primary bg-primary/20 p-2 rounded-full"
            />
            <div className="flex flex-col w-full">
              <p className="font-bold">Explorador</p>
              <p className="text-sm font-light text-neutral-400">
                Añade futbolines
              </p>
              <Progress value={10} />
            </div>
          </div>
          <div className="flex flex-row border border-neutral-600 rounded-lg p-4 items-center gap-4">
            <FontAwesomeIcon
              icon={faTrophy}
              className="text-primary bg-primary/20 p-2 rounded-full"
            />
            <div className="flex flex-col w-full">
              <p className="font-bold">Explorador</p>
              <p className="text-sm font-light text-neutral-400">
                Añade futbolines
              </p>
              <Progress value={60} />
            </div>
          </div>
          <div className="flex flex-row border border-neutral-600 rounded-lg p-4 items-center gap-4">
            <FontAwesomeIcon
              icon={faTrophy}
              className="text-primary bg-primary/20 p-2 rounded-full"
            />
            <div className="flex flex-col w-full">
              <p className="font-bold">Explorador</p>
              <p className="text-sm font-light text-neutral-400">
                Añade futbolines
              </p>
              <Progress value={25} />
            </div>
          </div>
        </div>
      </div>
      <Button
        variant="danger"
        onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
        label="Cerrar sesión"
      />
    </div>
  );
};
