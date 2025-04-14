
import { SearchInputRedirect } from "@/client/features/Landing/components/SearchInputRedirect";
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

  const ciudadLabel = decodeURIComponent(ciudad).split('_')[0];

  return (
    <>
      <h1 className="text-xl lg:text-3xl leading-5 font-bold text-primary tracking-tighter mb-2">
        Futbolines en {ciudadLabel}
      </h1>
      <span className="w-full my-2 z-3 relative">
        <SearchInputRedirect />
      </span>
      {children}
    </>
  );
};

export default layout;
