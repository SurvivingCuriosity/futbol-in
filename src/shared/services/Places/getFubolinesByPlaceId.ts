import connectDb from "@/shared/lib/db";
import Lugar, { ILugar } from "@/shared/models/Futbolin.model";
import { cache } from "react";
import { GoogleMapsService } from "../GoogleMaps/GoogleMapsService";

export const getFutbolinesByPlaceId = cache(
  async (placeId: string): Promise<ILugar[]> => {
    await connectDb();

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
);
