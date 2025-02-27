import Lugar, { ILugar } from "@/shared/models/Futbolin.model";
import { GoogleMapsService } from "../GoogleMaps/GoogleMapsService";
import connectDb from "@/shared/lib/db";

export async function getFutbolinesByPlaceId(
  placeId: string
): Promise<ILugar[]> {
  console.log("en getfutb");

  await connectDb()

  const coordinates = await GoogleMapsService.getCoordinatesFromPlaceId(
    placeId
  );

  const searchRadiusMeters = 10000;

  const futbolines = await Lugar.find({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [coordinates.lng, coordinates.lat],
        },
        $maxDistance: searchRadiusMeters,
      },
    },
  });

  return futbolines;
}
