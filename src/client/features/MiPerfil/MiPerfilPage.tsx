"use client";

import { EquipoDTO } from "@/server/models/Equipo/EquipoDTO";
import { UserDTO } from "@/server/models/User/UserDTO";
import { Button } from "futbol-in-ui";
import { signOut } from "next-auth/react";
import { Logros } from "./components/Logros";
import { MainInfo } from "./components/MainInfo";
import { MisEquipos } from "./components/MisEquipos";
import { CompletarPerfil } from "./CompletarPerfil/CompletarPerfil";

export interface MiPerfilPageProps {
  user: UserDTO;
  equipos: EquipoDTO[];
}

export const MiPerfilPage = (props: MiPerfilPageProps) => {
  const { user, equipos } = props;

  return (
    <div className="w-full h-full md:gap-8 justify-between flex flex-col space-y-8 md:space-y-0 md:mt-4 rounded-lg md:p-8 relative">
      <MainInfo user={user}/>

      <CompletarPerfil />

      <Logros user={user} />

      <MisEquipos equipos={equipos} />

      <span className="md:hidden">
        <Button
          variant="danger-outline"
          onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
          label="Cerrar sesión"
        />
      </span>
    </div>
  );
};
