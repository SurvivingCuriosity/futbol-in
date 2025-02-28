"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { SingleValue } from "react-select";
import { fetchCiudades } from "../services/Places/fetchCiudades";
import { AsyncSelectProps } from "futbol-in-ui";
// or whichever the correct type is for your library

export interface OptionType {
  value: string;
  label: string;
}

export interface PlaceOption extends OptionType {
  data: google.maps.places.AutocompletePrediction;
}

// 1) Dynamically import just the component you need from futbol-in-ui
//    We transform CustomAsyncSelect into a default export for the dynamic import:
const CustomAsyncSelectNoSSR = dynamic<AsyncSelectProps<PlaceOption>>( 
  () =>
    import("futbol-in-ui").then((mod) => ({
      default: mod.CustomAsyncSelect,
    })),
  {
    ssr: false,
  }
);

export default function SearchInputCiudad() {
  const router = useRouter();

  const handleSelect = async (place: SingleValue<PlaceOption>) => {
    if (!place) return;
    const ciudad = place.label.toLowerCase().replaceAll(" ", "-");
    router.push(`/futbolines/${encodeURIComponent(ciudad)}/${place.data.place_id}`);
  };

  return (
    <CustomAsyncSelectNoSSR
      onSelect={handleSelect}
      loadOptions={fetchCiudades}
      disabled={false}
      placeholder="Escribe para buscar..."
      noOptionsMessage="No hay resultados"
      loadingMessage="Cargando..."
    />
  );
}
