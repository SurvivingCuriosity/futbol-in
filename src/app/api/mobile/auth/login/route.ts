import { authOptions } from "@/server/lib/authOptions";
import { errorResponse } from "@/server/lib/httpResponse";
import { UserService } from "@/server/services/User/UserService";
import { UserRole, UserStatus } from "futbol-in-core/enum";
import { encode } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    /* 1. Leer body JSON */
    const { email, password } = (await req.json()) as {
      email?: string;
      password?: string;
    };

    if (!email || !password) {
      return errorResponse("Email y password son obligatorios", 400);
    }

    /* 2. Validar credenciales reaprovechando tu UserService */
    const user = await UserService.findByEmail(email);
    const isOk =
      user &&
      (await UserService.validatePassword(password, user.password || ""));

    if (!isOk) {
      return errorResponse("Credenciales inválidas", 401);
    }

    /* 3. Construir el payload con los mismos campos que grabas en el callback jwt */
    const tokenPayload = {
      id: user._id.toString(),
      status: user.status as UserStatus,
      role: user.role || [UserRole.USER],
      email: user.email,
      name: user.name,
      provider: user.provider,
      imagen: user.imagen || "",
    };

    /* 4. Firmar el JWT exactamente igual que NextAuth */
    const jwt = await encode({
      token: tokenPayload,
      secret: process.env.NEXTAUTH_SECRET!,
      maxAge: authOptions.session?.maxAge ?? 60 * 60 * 24 * 30, // 30 días (ajústalo si quieres)
    });

    /* 5. Devolver JSON cómodo de consumir en RN */
    return NextResponse.json({ token: jwt });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

/* Queremos que cada llamada calcule fresh data, no ISR */
export const dynamic = "force-dynamic";
