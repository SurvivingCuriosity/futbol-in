"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { SingleValue } from "react-select";
import { AsyncSelectProps } from "futbol-in-ui";
import { LStorage, LStorageKeys } from "@/server/services/LocalStorage/LStorage";
import { fetchCiudades } from "@/server/services/Places/fetchCiudades";

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

export default function SearchInputCiudad() {
  const router = useRouter();

  const handleSelect = async (place: SingleValue<PlaceOption>) => {
    if (!place) return;
    const ciudad = place.label.toLowerCase().replaceAll(" ", "-");
    LStorage.setItem(LStorageKeys.ULTIMA_UBICACION, {ciudad, placeId: place.value});
    router.push(`/spots/${encodeURIComponent(ciudad)}/${place.data.place_id}`);
  };

  return (
    <CustomAsyncSelectNoSSR
      onSelect={handleSelect}
      loadOptions={fetchCiudades}
      disabled={false}
      placeholder="Introduce una ciudad..."
      noOptionsMessage="No hay resultados"
      loadingMessage="Cargando..."
    />
  );
}
