"use client";

import { UserDTO } from "@/shared/models/User/UserDTO";
import { Button } from "futbol-in-ui";
import { signOut } from "next-auth/react";
import { Logros } from "./components/Logros";
import { MainInfo } from "./components/MainInfo";

export interface MiPerfilPageProps {
  user: UserDTO;
}

export const MiPerfilPage = (props: MiPerfilPageProps) => {
  const { user } = props;

  return (
    <div className="w-full h-full md:gap-8 justify-between flex flex-col space-y-8 md:space-y-0 md:mt-4 md:flex-row rounded-lg md:p-8 relative">
      <MainInfo user={user} />
      
      <Logros user={user} />

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
