"use client"
import SearchInputMunicipios from "@/client/shared/components/SearchInputMunicipios";
import { encodeCiudad } from "futbol-in-core/helpers";
import { redirect } from "next/navigation";

export const SearchInputRedirect = () => {
  const handleSelect = (ciudad: string) => {

    const ciudadFormateada = encodeCiudad(ciudad)

    redirect(`/spots/${ciudadFormateada}`);
  };
  return <SearchInputMunicipios onSelect={handleSelect} />;
};
