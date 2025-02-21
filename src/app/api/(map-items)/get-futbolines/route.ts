import connectDb from "@/shared/lib/db";
import { errorResponse, successResponse } from "@/shared/lib/httpResponse";
import Futbolin from "@/shared/models/Futbolin.model";
import { IMapItem } from "@/shared/types/MapItem/IMapItem";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const lat = parseFloat(searchParams.get("lat") || "");
    const lng = parseFloat(searchParams.get("lng") || "");
    const maxDistance = parseInt(searchParams.get("maxDistance") || "5000", 10);

    if (isNaN(lat) || isNaN(lng)) {
      return errorResponse("Falta latitud o longitud", 400);
    }

    await connectDb();

    const futbolines = await Futbolin.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [lng, lat],
          },
          $maxDistance: maxDistance,
        },
      },
    });

    const futbolinesTipados: IMapItem[] = futbolines.map((f) => ({
      nombre: f.name,
      direccion: f.address,
      lat: f.location.coordinates[1],
      lng: f.location.coordinates[0],
      googlePlaceId: f.googlePlaceId,
    }));

    return successResponse({ success: true, data: futbolinesTipados });
  } catch (error) {
    return errorResponse(error);
  }
}
