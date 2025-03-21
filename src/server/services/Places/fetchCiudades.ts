import { PlaceOption } from "@/client/shared/components/SearchInputBar";

export async function fetchCiudades(inputValue: string|number): Promise<PlaceOption[]> {
  if (!inputValue) return [];
  const res = await fetch(
    `/api/ciudades-autocomplete?input=${encodeURIComponent(inputValue)}`
  );
  const data = await res.json();
  if (data.status !== "OK") return [];

  return (data as google.maps.places.AutocompleteResponse).predictions.map(p => {
    // El primer término es el municipio
    const municipio = p.terms[0].value;
    let provincia = "";
    
    if (p.terms.length >= 3) {
      // Cuando hay tres o más términos, se asume:
      // - p.terms[0]: municipio
      // - p.terms[1]: provincia
      // - p.terms[2]: país (se ignora)
      provincia = p.terms[1].value;
    } else if (p.terms.length === 2) {
      // Si solo hay dos términos, se usa el secondary_text para separar provincia y país.
      // Suponiendo que secondary_text es algo como "Provincia, País", tomamos la primera parte.
      const secondary = p.structured_formatting.secondary_text || "";
      const parts = secondary.split(",");
      if (parts.length > 1) {
        provincia = parts[0].trim();
      }
      // Si no se encuentra una coma, asumimos que no hay información de provincia.
    }
    
    // Si no se obtuvo provincia, se muestra solo el municipio.
    const customLabel = provincia ? `${municipio}, ${provincia}` : municipio;
    
    return {
      value: p.place_id,
      label: customLabel,
      data: p,
    };
  });
}
