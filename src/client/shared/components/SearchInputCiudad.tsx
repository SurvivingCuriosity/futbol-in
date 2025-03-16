"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { SingleValue } from "react-select";
import { AsyncSelectProps } from "futbol-in-ui";
import {
  LStorage,
  LStorageKeys,
} from "@/client/shared/services/LocalStorage/LStorage";
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

export interface SearchInputCiudadProps {
  palceholder?: string;
}

export default function SearchInputCiudad(props: SearchInputCiudadProps) {
  const { palceholder = "Introduce una ciudad..." } = props;

  const router = useRouter();

  const handleSelect = async (place: SingleValue<PlaceOption>) => {
    if (!place) return;
    const ciudad = place.label.toLowerCase().replaceAll(" ", "-");

    let ultimasBusquedas =
      (LStorage.getItem(LStorageKeys.ULTIMAS_UBICACIONES) as {ciudad:string, placeId:string}[]) || [];

    ultimasBusquedas = ultimasBusquedas.filter(
      (s) => s.placeId !== place.data.place_id
    );

    ultimasBusquedas.unshift({
      ciudad,
      placeId: place.data.place_id,
    });

    if (ultimasBusquedas.length > 3) {
      ultimasBusquedas.pop();
    }

    LStorage.setItem(LStorageKeys.ULTIMAS_UBICACIONES, ultimasBusquedas);

    router.push(`/spots/${encodeURIComponent(ciudad)}/${place.data.place_id}`);
  };

  return (
    <CustomAsyncSelectNoSSR
      onSelect={handleSelect}
      loadOptions={fetchCiudades}
      disabled={false}
      placeholder={palceholder}
      noOptionsMessage="No hay resultados"
      loadingMessage="Cargando..."
    />
  );
}
