import { cache } from "react";

export const getCoordinatesFromPlaceId = cache(async (placeId: string) => {
  const res = await fetch(`/api/place-details?placeId=${placeId}`);
  const data = await res.json();
  return data;
});

export const getFullPlaceDetails = cache(async (placeId: string) => {
  const res = await fetch(`/api/full-place-details?placeId=${placeId}`);
  const data = await res.json();
  return data;
});