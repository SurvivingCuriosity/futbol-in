import { CurrentOpening } from "@/client/shared/components/TarjetaLugar/TarjetaLugar";
import { errorResponse } from "@/server/lib/httpResponse";
export type AutoCompleteKind = "address" | "establishment" | "(cities)";

export class GoogleMapsService {
  static key = process.env.NEXT_PUBLIC_MAPS_API_KEY!;

  static async autocomplete(
    text: string,
    type: AutoCompleteKind
  ): Promise<google.maps.places.AutocompleteResponse> {
    const url =
      `https://maps.googleapis.com/maps/api/place/autocomplete/json` +
      `?input=${encodeURIComponent(text)}` +
      `&key=${this.key}` +
      `&types=${type}` +
      `&components=country:es`;

    const res = await fetch(url);
    const data = await res.json();

    return data;
  }

  static async getCoordinatesFromCiudad(ciudad: string) {
    console.log("Llega ciudad: ", ciudad);
    if (!ciudad) {
      return errorResponse("ciudad es requerida", 400);
    }

    const url =
      `https://maps.googleapis.com/maps/api/geocode/json` +
      `?address=${encodeURIComponent(ciudad)}` +
      `&key=${this.key}` +
      `&components=country:es` +
      `&fields=geometry`;

    console.log(url);

    const res = await fetch(url);
    const data = await res.json();

    if (data.status !== "OK") {
      return errorResponse("No se pudo obtener la ciudad", 500);
    }

    return data.results[0].geometry.location;
  }

  static async getCoordinatesFromPlaceId(placeId: string) {
    if (!placeId) {
      return errorResponse("placeId es requerido", 400);
    }

    const url =
      `https://maps.googleapis.com/maps/api/place/details/json` +
      `?place_id=${placeId}` +
      `&key=${this.key}` +
      `&fields=geometry`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.status !== "OK") {
      return errorResponse("No se pudo obtener el lugar", 500);
    }

    return data.result.geometry.location;
  }

  static async getPlaceDetailsFromPlaceId(
    placeId: string
  ): Promise<google.maps.places.PlaceResult> {
    if (!placeId) {
      return errorResponse("placeId es requerido", 400);
    }

    const url =
      `https://maps.googleapis.com/maps/api/place/details/json` +
      `?place_id=${placeId}` +
      `&key=${this.key}`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.status !== "OK") {
      return errorResponse("No se pudo obtener el lugar", 500);
    }

    return data.result;
  }

  static async getPlaceDetailsFromPlaceIds(
    placeIds: string[]
  ): Promise<Array<google.maps.places.PlaceResult & CurrentOpening>> {
    if (!Array.isArray(placeIds) || placeIds.length === 0) {
      throw new Error("placeIds es requerido");
    }

    // → Campos mínimos que quieres (reduce coste y tamaño de la respuesta)
    const fields =
      "place_id,name,formatted_address,geometry/location,photos,types,current_opening_hours";

    /* ---------- 1. Disparamos todas las peticiones en paralelo ---------- */
    const requests = placeIds.map(async (id) => {
      const url =
        `https://maps.googleapis.com/maps/api/place/details/json` +
        `?place_id=${encodeURIComponent(id)}` +
        `&fields=${fields}` +
        `&key=${this.key}`;

      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status} al consultar ${id}`);
      }

      const data = await res.json();

      if (data.status !== "OK") {
        throw new Error(`No se pudo obtener el lugar ${id}: ${data.status}`);
      }

      return data.result;
    });

    /* ---------- 2. Esperamos todas y devolvemos el array limpio ---------- */
    return Promise.all(requests);
  }

  static async getNombreLocalidadFromPlaceId(placeId: string) {
    if (!placeId) {
      return errorResponse("placeId es requerido", 400);
    }

    const url =
      `https://maps.googleapis.com/maps/api/place/details/json` +
      `?place_id=${placeId}` +
      `&key=${this.key}` +
      `&fields=name`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.status !== "OK") {
      return errorResponse("No se pudo obtener el lugar", 500);
    }

    return data.result;
  }
}
