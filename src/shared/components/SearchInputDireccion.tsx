"use client";
import { IMapItem } from "@/shared/types/MapItem/IMapItem";
import { CustomAsyncSelect } from "futbol-in-ui";
import { SingleValue } from "react-select";
import { fetchDirecciones } from "../services/Places/fetchDirecciones";
import { getCoordinatesFromPlaceId } from "../services/Places/getCoordinatesFromPlaceId";

export interface OptionType {
  value: string;
  label: string;
}

export interface PlaceOption extends OptionType {
  data: google.maps.places.AutocompletePrediction;
}

export default function SearchInputDireccion({
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
    const selected: Pick<
      IMapItem,
      "nombre" | "direccion" | "lat" | "lng" | "googlePlaceId"
    > = {
      nombre: place.data.description || "Desconocido",
      direccion: place.data.description || "Desconocido",
      lat: coords.lat,
      lng: coords.lng,
      googlePlaceId: place.value || "Desconocido",
    };
    onSelect(selected);
  };

  return (
    <CustomAsyncSelect<PlaceOption>
      onSelect={handleSelect}
      loadOptions={fetchDirecciones}
      disabled={disabled}
      placeholder="Escribe para buscar..."
      noOptionsMessage="No hay resultados"
      loadingMessage="Cargando..."
    />
  );
}
