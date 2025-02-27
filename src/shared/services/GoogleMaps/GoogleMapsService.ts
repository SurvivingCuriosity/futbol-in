import { errorResponse } from "@/shared/lib/httpResponse";

export type AutoCompleteKind = "address" | "establishment" | "(cities)";

export class GoogleMapsService {
  static key = process.env.NEXT_PUBLIC_MAPS_API_KEY!;

  static async autocomplete(text: string, type: AutoCompleteKind) {
    const url =
      `https://maps.googleapis.com/maps/api/place/autocomplete/json` +
      `?input=${encodeURIComponent(text)}` +
      `&key=${this.key}` +
      `&types=${type}` +
      `&components=country:es`;

    const res = await fetch(url);
    const data = await res.json();

    return data
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

    console.log(data.result.geometry.location)
    return data.result.geometry.location
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

    return data.result
  }
}
