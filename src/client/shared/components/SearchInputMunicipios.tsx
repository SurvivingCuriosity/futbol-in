"use client";

import { fetchMunicipios } from "@/server/services/Places/fetchMunicipios";
import { AsyncSelectProps } from "futbol-in-ui";
import dynamic from "next/dynamic";
import { SingleValue } from "react-select";

export interface OptionType {
  value: string;
  label: string;
}

export interface PlaceOption extends OptionType {
  data: google.maps.places.AutocompletePrediction;
}

const CustomAsyncSelectNoSSR = dynamic<AsyncSelectProps<PlaceOption>>(
  () =>
    import("futbol-in-ui").then((mod) => ({
      default: mod.CustomAsyncSelect,
    })),
  {
    ssr: false,
  }
);

export interface SearchInputCiudadProps {
  palceholder?: string;
  onSelect: (v:string) => void
}

export default function SearchInputMunicipios(props: SearchInputCiudadProps) {
  const { palceholder = "Introduce una ciudad...", onSelect } = props;

  const handleSelect = async (place: SingleValue<PlaceOption>) => {
    onSelect(place?.label || '')
  };

  return (
    <CustomAsyncSelectNoSSR
      onSelect={handleSelect}
      loadOptions={fetchMunicipios}
      disabled={false}
      placeholder={palceholder}
      noOptionsMessage="No hay resultados"
      loadingMessage="Cargando..."
    />
  );
}
