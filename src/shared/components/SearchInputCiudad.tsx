"use client";

import { CustomAsyncSelect } from "futbol-in-ui";
import { useRouter } from "next/navigation";
import { SingleValue } from "react-select";
import { fetchCiudades } from "../services/Places/fetchCiudades";

export interface OptionType {
  value: string;
  label: string;
}

export interface PlaceOption extends OptionType {
  data: google.maps.places.AutocompletePrediction;
}

export default function SearchInputCiudad() {
  const router = useRouter();

  const handleSelect = async (place: SingleValue<PlaceOption>) => {
    if (!place) return;
    // para poder acceder a place Id desde el server
    document.cookie = `selectedPlaceId=${place.value}; path=/; SameSite=Strict;`;
    const urlSlug = place.label.toLowerCase().replaceAll(" ", "-");
    router.push(`/futbolines/${encodeURIComponent(urlSlug)}`);
  };

  return (
    <CustomAsyncSelect<PlaceOption>
      onSelect={handleSelect}
      loadOptions={fetchCiudades}
      disabled={false}
      placeholder="Escribe para buscar..."
      noOptionsMessage="No hay resultados"
      loadingMessage="Cargando..."
    />
  );
}
