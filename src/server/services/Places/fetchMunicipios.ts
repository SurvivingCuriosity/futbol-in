import { PlaceOption } from "@/client/shared/components/SearchInputBar";

export async function fetchMunicipios(inputValue: string|number): Promise<PlaceOption[]> {
  if (!inputValue) return [];

  const response = await fetch(`/api/search-municipio?q=${encodeURIComponent(inputValue)}`);
  const data = await response.json();

  const options: PlaceOption[] = data.map((item: {label:string}) => ({
    value: item.label,
    label: item.label,
  }));

  return options;
}
