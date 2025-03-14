"use client";

import { UserRole } from "@/core/enum/User/Role";
import { UserDTO } from "@/server/models/User/UserDTO";
import {
  faCheck,
  faTrophy,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface PerfilPageProps {
  user: UserDTO;
}

export const PerfilPage = (props: PerfilPageProps) => {
  const { user } = props;

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
            <FontAwesomeIcon
              icon={faUserCircle}
              className="text-neutral-700 text-7xl"
            />
          </span>
          <span className="flex flex-col gap-2">
            <p className="font-bold">{user.name}</p>
            <p className="text-neutral-400">Miembro desde el 2023</p>
          </span>
        </span>

        <div className="flex flex-row flex-wrap gap-2 w-full mt-4">
          <div className="rounded-2xl flex w-min whitespace-nowrap items-center gap-1 bg-blue-500/20 px-2 p-1 text-neutral-400">
            <FontAwesomeIcon
              icon={faTrophy}
              className="text-blue-500 rounded-full"
            />
            <p className="text-sm">10 Futbolín</p>
          </div>
          <div className="rounded-2xl flex w-min whitespace-nowrap items-center gap-1 bg-purple-500/20 px-2 p-1 text-neutral-400">
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
          </div>
        </div>
      </div>
      <div className="grow">
        <div className="flex flex-col md:flex-row items-start gap-4 w-full">
          <div className="p-4 w-full md:w-1/3 border border-neutral-500 rounded-lg flex flex-col items-center">
            <FontAwesomeIcon icon={faTrophy} className="text-primary" />
            <p>15</p>
            <p>Añadidos</p>
          </div>
          <div className="p-4 w-full md:w-1/3 border border-neutral-500 rounded-lg flex flex-col items-center">
            <FontAwesomeIcon icon={faTrophy} className="text-primary" />
            <p>15</p>
            <p>Añadidos</p>
          </div>
          <div className="p-4 w-full md:w-1/3 border border-neutral-500 rounded-lg flex flex-col items-center">
            <FontAwesomeIcon icon={faTrophy} className="text-primary" />
            <p>15</p>
            <p>Añadidos</p>
          </div>
        </div>
        <p className="my-4">Logros</p>
        <div className="space-y-4">
          <div className="flex flex-row border border-neutral-600 rounded-lg p-4 items-center gap-4">
            <FontAwesomeIcon
              icon={faTrophy}
              className="text-primary bg-primary/20 p-2 rounded-full"
            />
          
          </div>
          <div className="flex flex-row border border-neutral-600 rounded-lg p-4 items-center gap-4">
            <FontAwesomeIcon
              icon={faTrophy}
              className="text-primary bg-primary/20 p-2 rounded-full"
            />
           
          </div>
          <div className="flex flex-row border border-neutral-600 rounded-lg p-4 items-center gap-4">
            <FontAwesomeIcon
              icon={faTrophy}
              className="text-primary bg-primary/20 p-2 rounded-full"
            />
            
          </div>
        </div>
      </div>
    </div>
  );
};
