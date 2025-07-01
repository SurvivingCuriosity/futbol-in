"use client";

import { fetchCiudades } from "@/server/services/Places/fetchCiudades";
import { AsyncSelectProps } from "futbol-in-ui";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
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
  placeholder?: string;
}

export default function SearchInputCiudad(props: SearchInputCiudadProps) {
  const { placeholder = "Introduce una ciudad..." } = props;

  const router = useRouter();

  const handleSelect = async (place: SingleValue<PlaceOption>) => {
    if (!place) return;
    const ciudad = place.label.toLowerCase().replaceAll(" ", "-");

    router.push(`/spots/${encodeURIComponent(ciudad)}/${place.data.place_id}`);
  };

  return (
    <CustomAsyncSelectNoSSR
      onSelect={handleSelect}
      loadOptions={fetchCiudades}
      disabled={false}
      placeholder={placeholder}
      noOptionsMessage="No hay resultados"
      loadingMessage="Cargando..."
    />
  );
}
