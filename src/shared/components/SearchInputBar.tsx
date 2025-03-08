"use client";
import { IMapItem } from "@/shared/types/MapItem/IMapItem";
import { CustomAsyncSelect } from "futbol-in-ui";
import { SingleValue } from "react-select";
import { fetchBares } from "../services/Places/fetchBares";
import { getCoordinatesFromPlaceId } from "../services/Places/getCoordinatesFromPlaceId";

export interface OptionType {
  value: string;
  label: string;
}

export interface PlaceOption extends OptionType {
  data: google.maps.places.AutocompletePrediction;
}

export default function SearchInputBar({
  onSelect,
  disabled,
}: {
  onSelect: (
    val: Pick<
      IMapItem,
      "nombre" | "direccion" | "lat" | "lng" | "googlePlaceId"
    >
  ) => void;
  disabled?: boolean;
}) {
  const handleSelect = async (place: SingleValue<PlaceOption>) => {
    if (!place) return;
    const coords = await getCoordinatesFromPlaceId(place.value);
    console.log('El place', place)
    const selected: Pick<
      IMapItem,
      "nombre" | "direccion" | "lat" | "lng" | "googlePlaceId"
    > = {
      nombre: place.data.terms[0].value || "Desconocido",
      direccion: (`${place.data.terms[1].value} ${place.data.terms[2].value}`) || "Desconocido",
      lat: coords.lat,
      lng: coords.lng,
      googlePlaceId: place.value || "Desconocido",
    };
    onSelect(selected);
  };

  return (
    <CustomAsyncSelect<PlaceOption>
      onSelect={handleSelect}
      loadOptions={fetchBares}
      disabled={disabled}
      placeholder="Escribe para buscar..."
      noOptionsMessage="No hay resultados"
      loadingMessage="Cargando..."
    />
  );
}
