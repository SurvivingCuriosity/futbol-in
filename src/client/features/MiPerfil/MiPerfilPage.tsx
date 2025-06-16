"use client";

import { EquipoDTO } from "@/server/models/Equipo/EquipoDTO";
import { SpotDTO } from "@/server/models/Spot/SpotDTO";
import { UserDTO } from "@/server/models/User/UserDTO";
import { Button } from "futbol-in-ui";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { CompletarPerfil } from "./CompletarPerfil/CompletarPerfil";
import { HamburguerMenu } from "./components/HamburguerMenu/HamburguerMenu";
import { Logros } from "./components/Logros";
import { MainInfo } from "./components/MainInfo";
import { MisEquipos } from "./components/MisEquipos";
import { MisFutbolines } from "./components/MisFutbolines";

export interface MiPerfilPageProps {
  user: UserDTO;
  equipos: EquipoDTO[];
  futbolines: SpotDTO[];
}

export const MiPerfilPage = (props: MiPerfilPageProps) => {
  const { user: userProp, equipos, futbolines } = props;

  const [user, setUser] = useState(userProp);

  return (
    <div className="w-full h-full md:gap-8 justify-between flex flex-col space-y-8 md:space-y-0 md:mt-4 rounded-lg md:p-8 relative">
      <HamburguerMenu user={user} />

      <MainInfo user={user} />
      

      <CompletarPerfil user={user} onUpdateUser={setUser} />

      <div className="flex flex-col gap-4 lg:flex-row">
        <Logros user={user} />

        <MisEquipos equipos={equipos} />
      </div>

      <MisFutbolines futbolines={futbolines} operador={null}/>

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
