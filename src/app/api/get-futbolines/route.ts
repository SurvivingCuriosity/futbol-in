// src/app/api/futbolines/route.ts
import { NextResponse } from "next/server";
import connectDb from "@/lib/db";
import Futbolin from "@/models/Futbolin.model";
import { IMapItem } from "@/types/MapItem/IMapItem";
import { getErrorMessage } from "@/utils/getErrorMessage";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const lat = parseFloat(searchParams.get("lat") || "");
    const lng = parseFloat(searchParams.get("lng") || "");
    const maxDistance = parseInt(searchParams.get("maxDistance") || "5000", 10);

    if (isNaN(lat) || isNaN(lng)) {
      return NextResponse.json({ error: "Latitude and longitude are required" }, { status: 400 });
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
      lon: f.location.coordinates[0],
      googlePlaceId: f.googlePlaceId,
    }));

    return NextResponse.json({ success: true, data: futbolinesTipados });
  } catch (error) {
    const message = getErrorMessage(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}