import { PlaceOption } from "@/client/shared/components/SearchInputBar";

export async function fetchDirecciones(inputValue: string|number): Promise<PlaceOption[]> {
  if (!inputValue) return [];
  const res = await fetch(
    `/api/addresses-autocomplete?input=${encodeURIComponent(inputValue)}`
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