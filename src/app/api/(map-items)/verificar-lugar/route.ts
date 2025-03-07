import { authOptions } from "@/shared/lib/authOptions";
import connectDb from "@/shared/lib/db";
import { errorResponse } from "@/shared/lib/httpResponse";
import Lugar from "@/shared/models/Lugar/Lugar.model";
import { UserService } from "@/shared/services/User/UserService";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDb();
    const { lugarId, vote } = await req.json();

    if (!lugarId || !["up", "down"].includes(vote)) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }

    const session = await getServerSession(authOptions);
    const user = session?.user;
    const userDb = await UserService.findById(user?.id);

    if (!userDb) {
      return NextResponse.json({ error: "Sin credenciales" }, { status: 401 });
    }

    const lugar = await Lugar.findById(lugarId);
    if (!lugar) {
      return NextResponse.json({ error: "Lugar no encontrado" }, { status: 404 });
    }

    lugar.verificado = {
      correcto: vote === "up" ? true : false,
      idUser: userDb.id,
      fechaVerificacion: new Date(),
    };

    await lugar.save();
    return NextResponse.json({ success: true, lugar }, { status: 200 });
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
