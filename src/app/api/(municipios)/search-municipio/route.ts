
import { successResponse } from "@/server/lib/httpResponse";
import { municipios, Province, Region, Town } from "futbol-in-core/constants";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";

  if (!q) {
    return successResponse([]);
  }

  // "Normalizamos" el texto de búsqueda
  const searchNormalized = quitarAcentos(q).toLowerCase();

  const results: {label:string}[] = [];

  municipios.forEach((region: Region) => {
    region.provinces.forEach((province: Province) => {
      province.towns.forEach((town: Town) => {
        // Normalizamos el municipio para comparar sin acentos
        const labelNormalized = quitarAcentos(town.label).toLowerCase();

        if (labelNormalized.includes(searchNormalized)) {
          results.push({
            label: `${town.label}, ${province.label}`,
          });
        }
      });
    });
  });

  // Opcional: limitar a 20 resultados
  const limitedResults = results.slice(0, 20);

  return successResponse(limitedResults);
}

function quitarAcentos(str: string): string {
  // Convierte a la forma NFD (carácter base + marcas de acento) y elimina \p{M} (marcas de acentuación).
  return str.normalize("NFD").replace(/\p{M}/gu, "");
}