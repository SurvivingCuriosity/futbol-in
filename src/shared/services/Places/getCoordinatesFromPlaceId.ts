export async function getCoordinatesFromPlaceId(placeId: string) {
    const res = await fetch(`/api/place-details?placeId=${placeId}`);
    const data = await res.json();
    return data;
  }