import connectDb from "@/shared/lib/db";
import { errorResponse, successResponse } from "@/shared/lib/httpResponse";
import Lugar from "@/shared/models/Lugar/Lugar.model";
import { LugarDTO } from "@/shared/models/Lugar/LugarDTO";

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

    const futbolines = await Lugar.find({
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

    const futbolinesTipados: LugarDTO[] = futbolines.map((f) => ({
      id: f._id.toString(),
      nombre: f.nombre,
      direccion: f.direccion,
      coordinates: [f.location.coordinates[0], f.location.coordinates[1]],
      googlePlaceId: f.googlePlaceId,
      tipoFutbolin: f.tipoFutbolin,
      tipoLugar: f.tipoLugar,
      comentarios: f.comentarios,
      verificado: f.verificado
        ? {
            idUser: String(f.verificado.idUser),
            fechaVerificacion: f.verificado.fechaVerificacion,
          }
        : null,
      votes: {
        up: f.votes.up.map((vote) => vote.toString()),
        down: f.votes.down.map((vote) => vote.toString()),
      },
    }));

    return successResponse({ success: true, data: futbolinesTipados });
  } catch (error) {
    return errorResponse(error);
  }
}
