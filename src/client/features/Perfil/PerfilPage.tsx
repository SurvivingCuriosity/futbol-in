"use client";

import { GoBackLayout } from "@/client/shared/layouts/GoBackLayout";
import { UserDTO } from "@/server/models/User/UserDTO";
import { useSearchParams } from "next/navigation";
import { Logros } from "./components/Logros";
import { MainInfo } from "./components/MainInfo";

export interface MiPerfilPageProps {
  user: UserDTO;
}

export const PerfilPage = (props: MiPerfilPageProps) => {
  const { user } = props;

  const searchParams = useSearchParams();
  const fromParam = searchParams.get("from") || "/";

  return (
    <GoBackLayout href={`/${fromParam}`}>
      <div className="w-full h-full md:gap-8 justify-between flex flex-col space-y-8 md:space-y-0 md:mt-4 md:flex-row rounded-lg md:p-8 relative">
        <MainInfo user={user} />

        <Logros user={user} />

      </div>
    </GoBackLayout>
  );
};
