import SearchInputCiudad from "@/client/shared/components/SearchInputCiudad";
import React from "react";

interface CityLayoutProps {
  params: Promise<{
    ciudad: string;
    placeId: string;
  }>;
  children: React.ReactNode;
}

const layout = async (props: CityLayoutProps) => {
  const { children, params } = props;

  const { ciudad } = await params;

  const ciudadLabel = decodeURIComponent(ciudad.charAt(0).toUpperCase() + ciudad.slice(1));

  return (
    <>
      <h1 className="hidden md:block text-3xl mb-2 font-extrabold text-primary tracking-tight">
        Futbolines en {ciudadLabel}
      </h1>
      <h1 className="block md:hidden text-3xl mb-2 font-extrabold text-primary tracking-tight">
        {ciudadLabel}
      </h1>
      <span className="w-full my-2 z-5">
        <SearchInputCiudad palceholder="Busca en otra ciudad..."/>
      </span>
      {children}
    </>
  );
};

export default layout;
