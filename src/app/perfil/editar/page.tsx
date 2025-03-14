"use client";

import { EditarPerfilPage } from "@/client/features/Perfil/Editar/EditarPerfilPage";
import { GoBackLayout } from "@/client/shared/layouts/GoBackLayout";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();
  const fromParam = searchParams.get("from") || "/";

  return (
    <GoBackLayout href={`/${fromParam}`} className="max-w-lg mx-auto">
      <EditarPerfilPage />
    </GoBackLayout>
  );
};

export default Page;
