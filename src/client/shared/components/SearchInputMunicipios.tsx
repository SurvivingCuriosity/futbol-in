"use client";

import { fetchMunicipios } from "@/server/services/Places/fetchMunicipios";
import { AsyncSelectProps } from "futbol-in-ui";
import dynamic from "next/dynamic";
import { SingleValue } from "react-select";

export interface MunicipioOption {
  value: string;
  label: string;
}

const CustomAsyncSelectNoSSR = dynamic<AsyncSelectProps<MunicipioOption>>(
  () =>
    import("futbol-in-ui").then((mod) => ({
      default: mod.CustomAsyncSelect,
    })),
  {
    ssr: false,
  }
);

export interface SearchInputCiudadProps {
  value?:string;
  palceholder?: string;
  onSelect: (v:string) => void
}

export default function SearchInputMunicipios(props: SearchInputCiudadProps) {
  const { palceholder = "Introduce una ciudad...", onSelect, value = null } = props;

  const handleSelect = async (place: SingleValue<MunicipioOption>) => {
    onSelect(place?.label || '')
  };

  return (
    <CustomAsyncSelectNoSSR
      value={value ? {
        label: value,
        value: value,
      } : undefined}
      onSelect={handleSelect}
      loadOptions={fetchMunicipios}
      disabled={false}
      placeholder={palceholder}
      noOptionsMessage="No hay resultados"
      loadingMessage="Cargando..."
    />
  );
}
