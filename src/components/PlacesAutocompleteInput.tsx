"use client";
import AsyncSelect from "react-select/async";
import { useCallback } from "react";

// Llama la Web Service de autocomplete
// https://maps.googleapis.com/maps/api/place/autocomplete/json
// O un endpoint tuyo que la llame
async function fetchPlaces(inputValue: string) {
  if (!inputValue) return [];
  const res = await fetch(
    `/api/places-autocomplete?input=${encodeURIComponent(inputValue)}`
  );
  const data = await res.json();
  if (data.status !== "OK") return [];

  return data.predictions.map((p: any) => ({
    value: p.place_id,
    label: p.description,
    data: p,
  }));
}

async function getCoordinates(placeId: string) {
  const res = await fetch(`/api/place-details?placeId=${placeId}`);
  const data = await res.json();

  return data; // { lat: ..., lng: ... }
}

export default function PalcesAutocompleteInput({
  onSelect,
}: {
  onSelect: (val: any) => void;
}) {
  const loadOptions = useCallback(async (inputValue: string) => {
    // implement debounce
    if (!inputValue) return [];

    const suggestions = await fetchPlaces(inputValue);
    return suggestions;
  }, []);

  return (
    <AsyncSelect
      placeholder="Busca un bar..."
      loadOptions={fetchPlaces}
      onChange={async (selected) => {
        console.log("Lugar seleccionado:", selected);

        const coords = await getCoordinates(selected.value);
        console.log("Coordenadas:", coords);
      }}
    />
  );
}
