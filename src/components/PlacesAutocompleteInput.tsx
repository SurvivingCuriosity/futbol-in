"use client";
import { IMapItem } from "@/types/MapItem/IMapItem";
import { SingleValue } from "react-select";
import AsyncSelect from "react-select/async";


async function fetchPlaces(inputValue: string) {
  if (!inputValue) return [];
  const res = await fetch(
    `/api/places-autocomplete?input=${encodeURIComponent(inputValue)}`
  );
  const data = await res.json();
  if (data.status !== "OK") return [];

  return (data as google.maps.places.AutocompleteResponse).predictions.map((p) => ({
    value: p.place_id,
    label: p.description,
    data: p,
  }));
}

async function getCoordinates(placeId: string) {
  const res = await fetch(`/api/place-details?placeId=${placeId}`);
  const data = await res.json();

  return data;
}

export default function PalcesAutocompleteInput({
  onSelect,
}: {
  onSelect: (val: IMapItem) => void;
}) {

  const handleSelect = async (place:SingleValue<{
    value: string;
    label: string;
    data: google.maps.places.AutocompletePrediction;
}>) => {
    const coords = await getCoordinates(place?.value ?? '');
    const selected = {
      nombre: place?.data?.description || 'Desconocido',
      direccion: place?.data?.description || 'Desconocido',
      lat: coords.lat,
      lon: coords.lng,
      googlePlaceId: place?.value || 'Desconocido',
    }
    onSelect(selected);
  }

  return (
    <AsyncSelect
      placeholder="Busca un bar..."
      loadOptions={fetchPlaces}
      onChange={handleSelect}
    />
  );
}
