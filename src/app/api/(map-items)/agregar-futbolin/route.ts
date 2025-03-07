import { authOptions } from "@/shared/lib/authOptions";
import connectDb from "@/shared/lib/db";
import { errorResponse, successResponse } from "@/shared/lib/httpResponse";
import Lugar from "@/shared/models/Lugar/Lugar.model";
import { LugarDTO } from "@/shared/models/Lugar/LugarDTO";
import { UserService } from "@/shared/services/User/UserService";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  try {
    await connectDb();
    const lugar: LugarDTO = await req.json();
    const {
      nombre,
      direccion,
      coordinates: [lng, lat],
      googlePlaceId,
      tipoLugar,
      tipoFutbolin,
      verificado,
    } = lugar;

    if (!nombre || !direccion || !lat || !lng || !googlePlaceId) {
      return successResponse("Falta algún campo", 400);
    }

    const session = await getServerSession(authOptions);
    const user = session?.user;

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
      verificado,
    });

    if (user) {
      await UserService.incrementUserStat(user.id, "addedFutbolines");
    }

    return successResponse({ success: true, futbolin: newLugar }, 201);
  } catch (error) {
    return errorResponse(error);
  }
}
