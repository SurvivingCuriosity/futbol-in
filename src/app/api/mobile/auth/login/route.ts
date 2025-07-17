import { SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { UserService } from "@/server/services/User/UserService";
import { UserRole, UserStatus } from "futbol-in-core/enum";
import { errorResponse } from "@/server/lib/httpResponse";

/* ---------- fuerza runtime Node ---------- */
export const runtime = "nodejs";

/* ---------- 30 días ---------- */
const EXP = 60 * 60 * 24 * 30;

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

    /* 3. Payload (todo primitivo) */
    const payload = {
      id:        String(user._id),
      email:     user.email ?? "",
      name:      user.name  ?? "",
      role:      (user.role || [UserRole.USER]).map(String), // array de strings
      status:    user.status as UserStatus,
      provider:  user.provider ?? "",
      imagen:    user.imagen  ?? "",
    };

    /* 4. Firmar HS256 */
    const secret = new TextEncoder().encode(process.env.JWT_MOBILE_SECRET!);
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(EXP)
      .sign(secret);

    /* 5. Respuesta */
    return NextResponse.json({ token, user: payload });
  } catch (err) {
    console.error(err);
    return errorResponse("Error interno", 500);
  }
}

export const dynamic = "force-dynamic";
