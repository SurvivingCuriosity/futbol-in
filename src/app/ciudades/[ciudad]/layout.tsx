import { SearchInputRedirect } from "@/client/features/Landing/components/SearchInputRedirect";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

interface CityLayoutProps {
  params: Promise<{
    ciudad: string;
  }>;
  children: React.ReactNode;
}

const layout = async (props: CityLayoutProps) => {
  const { children, params } = props;

  const { ciudad } = await params;

  const ciudadLabel = decodeURIComponent(ciudad).split("_")[0];

  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-xl lg:text-3xl leading-5 font-bold text-primary tracking-tighter">
          Futbolines en {ciudadLabel}
        </h1>
        <Link href={`/ciudades/global?from=${`/ciudades/${ciudad}`}`} className="text-neutral-500 hover:text-primary">
          <FontAwesomeIcon icon={faGlobe} className="mr-1" />
        </Link>
      </div>
      <span className="w-full my-2 z-3 relative">
        <SearchInputRedirect />
      </span>
      {children}
    </>
  );
};

export default layout;
