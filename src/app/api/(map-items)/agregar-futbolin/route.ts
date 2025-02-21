import connectDb from "@/shared/lib/db";
import { errorResponse, successResponse } from "@/shared/lib/httpResponse";
import Futbolin from "@/shared/models/Futbolin.model";

export async function POST(req: Request) {
  try {
    await connectDb();
    const { nombre, direccion, lat, lng, googlePlaceId } = await req.json();

    if (!nombre || !direccion || !lat || !lng || !googlePlaceId) {
      return successResponse('Falta algún campo', 400);
    }

    const newFutbolin = await Futbolin.create({
      nombre,
      direccion,
      googlePlaceId,
      location: {
        type: "Point",
        coordinates: [lng, lat],
      },
    });

    return successResponse({ success: true, futbolin: newFutbolin }, 201);
  } catch (error) {
    return errorResponse(error);
  }
}
