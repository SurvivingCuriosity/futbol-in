import { UserStatus } from "@/shared/enum/User/Status";
import { authOptions } from "@/shared/lib/authOptions";
import connectDb from "@/shared/lib/db";
import { errorResponse } from "@/shared/lib/httpResponse";
import { User } from "@/shared/models/User/User.model";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectDb();

    const session = await getServerSession(authOptions);
    console.log(session);

    if (!session?.user) {
      return NextResponse.json({ error: "No hay sesión" }, { status: 401 });
    }

    const { username } = await request.json();
    if (!username) {
      return NextResponse.json({ error: "Falta username" }, { status: 400 });
    }

    const user = await User.findById(session.user.id);

    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    // Asegúrate de que esté en MUST_CREATE_USERNAME
    if (user.status !== UserStatus.MUST_CREATE_USERNAME) {
      return NextResponse.json(
        { error: "No puedes crear username ahora" },
        { status: 400 }
      );
    }

    // Check si username en uso
    const existing = await User.findOne({ name: username });
    if (existing) {
      return NextResponse.json(
        { error: "Este username ya está en uso" },
        { status: 400 }
      );
    }

    // Guardar
    user.name = username;
    user.status = UserStatus.DONE;
    await user.save();

    const response = NextResponse.json({ success: true });
    response.cookies.set("registrationToken", "", {
      maxAge: 0, // Caduca inmediatamente
      path: "/", // Asegura que coincida con el path donde se seteó
      // secure: true // En producción con HTTPS
      // httpOnly: true // Si ya estaba en httpOnly
    });
    return response;
  } catch (err) {
    return errorResponse(err);
  }
}
