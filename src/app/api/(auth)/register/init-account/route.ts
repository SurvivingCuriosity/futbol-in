// app/api/register/init-account/route.ts
import { UserStatus } from "@/shared/enum/User/Status";
import { verifyRegistrationToken } from "@/shared/lib/authToken";
import connectDb from "@/shared/lib/db";
import { errorResponse } from "@/shared/lib/httpResponse";
import { User } from "@/shared/models/User/User.model";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectDb();

    const cookies = request.headers.get("cookie") || "";
    const token = getCookieValue(cookies, "registrationToken");
    if (!token) {
      return errorResponse("No token found", 401);
    }

    const { username, password } = await request.json();
    if (!username || !password) {
      return errorResponse("Faltan username o password", 400);
    }

    // Verificar token
    const payload = verifyRegistrationToken(token);

    // Cargar usuario
    const user = await User.findById(payload.userId);
    if (!user) {
      return errorResponse("Usuario no encontrado", 404);
    }
    if (user.status !== UserStatus.MUST_INIT_ACCOUNT) {
      return errorResponse("No puedes crear credenciales todavía", 400);
    }

    // Username en uso?
    const existingName = await User.findOne({ name: username });
    if (existingName) {
      return errorResponse("El username ya está en uso", 400);
    }

    // Guardar
    user.name = username;
    user.password = bcrypt.hashSync(password, 10);
    user.status = UserStatus.DONE;
    await user.save();

    const response = NextResponse.json({ success: true });
    response.cookies.set("registrationToken", "", {
      maxAge: 0,     // Caduca inmediatamente
      path: "/",     // Asegura que coincida con el path donde se seteó
      // secure: true // En producción con HTTPS
      // httpOnly: true // Si ya estaba en httpOnly
    });
    return response;
  } catch (err: unknown) {
    return errorResponse(err);
  }
}

function getCookieValue(cookieHeader: string, name: string): string | null {
  const match = cookieHeader.match(new RegExp("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)"));
  return match ? match[2] : null;
}
