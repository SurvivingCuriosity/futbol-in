import { NextRequest } from "next/server";
import { GoogleMapsService } from "@/server/services/GoogleMaps/GoogleMapsService";
import { successResponse, errorResponse } from "@/server/lib/httpResponse";

export async function GET(req: NextRequest) {
  const ciudad =
    req.nextUrl.searchParams.get("ciudad") ?? req.nextUrl.searchParams.get("q"); // alias opcional

  if (!ciudad) {
    return errorResponse("ciudad es requerida", 400);
  }

  try {
    const coords = await GoogleMapsService.getCoordinatesFromCiudad(ciudad);

    if (coords instanceof Response) return coords;

    return successResponse(coords, 200);
  } catch (err) {
    return errorResponse(err, 500);
  }
}

/* Evita que Next lo almacene estáticamente (queremos datos live) */
export const dynamic = "force-dynamic";
