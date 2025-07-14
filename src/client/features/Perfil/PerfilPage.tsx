"use client";

import { GoBackLayout } from "@/client/shared/layouts/GoBackLayout";
import { UserDTO } from "futbol-in-core/types";
import { useSearchParams } from "next/navigation";

import { MainInfo } from "./components/MainInfo";
import { Logros } from "../MiPerfil/components/Logros";
import { SpotDTO } from "futbol-in-core/types";
import { MisFutbolines } from "../MiPerfil/components/MisFutbolines";
import { OperadorDTO } from "futbol-in-core/types";

export interface MiPerfilPageProps {
  user: UserDTO;
  spots: SpotDTO[]
  operador: OperadorDTO|null|undefined
}

export const PerfilPage = (props: MiPerfilPageProps) => {
  const { user, spots, operador } = props;

  const searchParams = useSearchParams();
  const fromParam = searchParams.get("from") || "/";

  return (
    <GoBackLayout href={`/${fromParam}`}>
      <div className="w-full h-full md:gap-8 justify-between flex flex-col space-y-8 md:space-y-0 md:mt-4 rounded-lg md:p-8 relative">
        <MainInfo user={user} />

        <Logros user={user} />

        <MisFutbolines futbolines={spots} operador={operador}/>

      </div>
    </GoBackLayout>
  );
};
