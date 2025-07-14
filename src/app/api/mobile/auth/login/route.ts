import { SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { UserService } from "@/server/services/User/UserService";
import { UserRole, UserStatus } from "futbol-in-core/enum";
import { errorResponse } from "@/server/lib/httpResponse";

/** 30 días en segundos */
const EXP = 60 * 60 * 24 * 30;

/* POST /api/mobile/auth/login */
export async function POST(req: NextRequest) {
  try {
    /* 1. Body */
    const { email, password } = (await req.json()) as {
      email?: string;
      password?: string;
    };

    if (!email || !password) {
      return errorResponse("Email y password son obligatorios", 400);
    }

    /* 2. Validaciones */
    const user = await UserService.findByEmail(email);
    const valid =
      user && (await UserService.validatePassword(password, user.password || ""));

    if (!valid) {
      return errorResponse("Credenciales inválidas", 401);
    }

    /* 3. Payload común */
    const payload = {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role || [UserRole.USER],
      status: user.status as UserStatus,
      provider: user.provider,
      imagen: user.imagen || "",
    };

    /* 4. Firmar HS256 */
    const secret = new TextEncoder().encode(process.env.JWT_MOBILE_SECRET!);
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(EXP)
      .sign(secret);

    /* 5. Devolver token + payload */
    return NextResponse.json({ token, user: payload });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

/* Siempre fresh */
export const dynamic = "force-dynamic";
