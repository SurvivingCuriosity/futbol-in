import { authOptions } from "@/shared/lib/authOptions";
import connectDb from "@/shared/lib/db";
import { errorResponse, successResponse } from "@/shared/lib/httpResponse";
import { SpotService } from "@/shared/services/Spots/SpotsService";
import { UserService } from "@/shared/services/User/UserService";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDb();
    const { spotId, vote } = await req.json();

    // Validaciones iniciales
    if (!spotId || !["up", "down"].includes(vote)) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }

    // Obtención del usuario que realiza la petición
    const session = await getServerSession(authOptions);
    const user = session?.user;
    const userDb = await UserService.findById(user?.id);

    if (!userDb) {
      return NextResponse.json({ error: "Sin credenciales" }, { status: 401 });
    }

    // Actualización del spot
    const updatedSpot = await SpotService.votarSpot(spotId, vote, userDb.id);

    // Respuesta
    return successResponse({ success: true, spot: updatedSpot }, 200);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
