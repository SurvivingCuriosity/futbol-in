import connectDb from "@/shared/lib/db";
import { errorResponse, successResponse } from "@/shared/lib/httpResponse";
import Lugar from '@/shared/models/Futbolin.model';

export async function POST(req: Request) {
  try {
    await connectDb();
    const { nombre, direccion, lat, lng, googlePlaceId, tipoFutbolin, tipoLugar } = await req.json();

    if (!nombre || !direccion || !lat || !lng || !googlePlaceId) {
      return successResponse('Falta algún campo', 400);
    }

    const newLugar = await Lugar.create({
      nombre,
      direccion,
      googlePlaceId,
      location: {
        type: "Point",
        coordinates: [lng, lat],
      },
      tipoLugar,
      tipoFutbolin,
    });

    return successResponse({ success: true, futbolin: newLugar }, 201);
  } catch (error) {
    return errorResponse(error);
  }
}
