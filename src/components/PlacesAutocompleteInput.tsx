"use client";
import { IMapItem } from "@/shared/types/MapItem/IMapItem";
import { SingleValue } from "react-select";
import AsyncSelect from "react-select/async";

async function fetchPlaces(inputValue: string) {
  if (!inputValue) return [];
  const res = await fetch(
    `/api/places-autocomplete?input=${encodeURIComponent(inputValue)}`
  );
  const data = await res.json();
  if (data.status !== "OK") return [];

  return (data as google.maps.places.AutocompleteResponse).predictions.map(
    (p) => ({
      value: p.place_id,
      label: p.description,
      data: p,
    })
  );
}

async function getCoordinates(placeId: string) {
  const res = await fetch(`/api/place-details?placeId=${placeId}`);
  const data = await res.json();

  return data;
}

export default function PalcesAutocompleteInput({
  onSelect,
  disabled,
}: {
  onSelect: (val: IMapItem) => void;
  disabled?: boolean;
}) {
  const handleSelect = async (
    place: SingleValue<{
      value: string;
      label: string;
      data: google.maps.places.AutocompletePrediction;
    }>
  ) => {
    const coords = await getCoordinates(place?.value ?? "");
    const selected = {
      nombre: place?.data?.description || "Desconocido",
      direccion: place?.data?.description || "Desconocido",
      lat: coords.lat,
      lng: coords.lng,
      googlePlaceId: place?.value || "Desconocido",
    };
    onSelect(selected);
  };

  return (
    <AsyncSelect
      placeholder="Busca un bar..."
      loadOptions={fetchPlaces}
      onChange={handleSelect}
      isDisabled={disabled}
      styles={{
        control: (provided, { isDisabled }) => ({
          ...provided,
          backgroundColor: isDisabled
            ? "var(--color-neutral-800)"
            : "var(--color-neutral-950)",
          border: "1px solid var(--color-neutral-700)",
          boxShadow: "none",
        }),

        menu: (provided) => ({
          ...provided,
          padding: '0.25em',
          backgroundColor: "var(--color-neutral-950)",
          border: "1px solid var(--color-neutral-700)",
          boxShadow: "none",
        }),

        option: (provided, { isSelected }) => ({
          ...provided,
          borderRadius: '5px',
          backgroundColor: isSelected
            ? "var(--color-neutral-900)"
            : "var(--color-neutral-950)",
          color: isSelected
            ? "var(--color-neutral-50)"
            : "var(--color-neutral-50)",
          "&:hover": {
            backgroundColor: "var(--color-neutral-900)",
            color: "var(--color-primary)",
          },
        }),
      }}
    />
  );
}
