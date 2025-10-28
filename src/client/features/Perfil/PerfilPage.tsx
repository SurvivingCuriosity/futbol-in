"use client";

import { GoBackLayout } from "@/client/shared/layouts/GoBackLayout";
import { UserDTO } from "futbol-in-core/types";
import { useSearchParams } from "next/navigation";

import { SpotDTO } from "futbol-in-core/types";
import { Logros } from "../MiPerfil/components/Logros";
import { MisFutbolines } from "../MiPerfil/components/MisFutbolines";
import { MainInfo } from "./components/MainInfo";

export interface MiPerfilPageProps {
  user: UserDTO;
  spots: SpotDTO[]
}

export const PerfilPage = (props: MiPerfilPageProps) => {
  const { user, spots } = props;

  const searchParams = useSearchParams();
  const fromParam = searchParams.get("from") || "/";
  
  return (
    <GoBackLayout href={`/${fromParam}`}>
      <div className="w-full h-full md:gap-8 justify-between flex flex-col space-y-8 md:space-y-0 md:mt-4 rounded-lg md:p-8 relative">
        <MainInfo user={user} />

        <Logros user={user} />

        <MisFutbolines futbolines={spots} />

      </div>
    </GoBackLayout>
  );
};
