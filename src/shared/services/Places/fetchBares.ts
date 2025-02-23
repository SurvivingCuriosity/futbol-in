import { PlaceOption } from "@/shared/components/SearchInputBar";

export async function fetchBares(inputValue: string): Promise<PlaceOption[]> {
  if (!inputValue) return [];
  const res = await fetch(
    `/api/bares-autocomplete?input=${encodeURIComponent(inputValue)}`
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