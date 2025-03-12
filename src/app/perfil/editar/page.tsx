"use client";
import { GoBackLayout } from "@/shared/layouts/GoBackLayout";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();
  const fromParam = searchParams.get("from") || "/";
  
  return (
    <GoBackLayout href={`/${fromParam}`}>
      <div>Editar perfil</div>
    </GoBackLayout>
  );
};

export default Page;
