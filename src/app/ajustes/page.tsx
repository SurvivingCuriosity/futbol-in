"use client";

import { AjustesPage } from "@/features/Ajustes/AjustesPage";
import { GoBackLayout } from "@/shared/layouts/GoBackLayout";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();
  const fromParam = searchParams.get("from") || "/";
  
  return (
    <GoBackLayout href={`/${fromParam}`} className="max-w-lg mx-auto">
      <AjustesPage />
    </GoBackLayout>
  );
};

export default Page;
