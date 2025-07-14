import { OAuth2Client } from "google-auth-library";
import { SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { UserService } from "@/server/services/User/UserService";
import { UserRole, UserStatus, AuthProvider } from "futbol-in-core/enum";
import { errorResponse } from "@/server/lib/httpResponse";

/** 30 días en segundos */
const EXP = 60 * 60 * 24 * 30;
const client = new OAuth2Client(process.env.GOOGLE_MOBILE_CLIENT_ID!);

/* POST /api/mobile/auth/google */
export async function POST(req: NextRequest) {
  try {
    const { idToken } = (await req.json()) as { idToken?: string };
    if (!idToken) return errorResponse("idToken requerido", 400);

    /* 1. Verificar token de Google */
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_MOBILE_CLIENT_ID,
    });
    const google = ticket.getPayload();
    if (!google?.email) return errorResponse("Token inválido", 401);

    /* 2. Buscar o crear usuario */
    let user = await UserService.findByEmail(google.email);
    if (!user) user = await UserService.createGoogleUser(google.email);

    /* 3. Payload */
    const payload = {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role || [UserRole.USER],
      status: user.status as UserStatus,
      provider: AuthProvider.GOOGLE,
      imagen: user.imagen || google.picture || "",
    };

    /* 4. Firmar HS256 */
    const secret = new TextEncoder().encode(process.env.JWT_MOBILE_SECRET!);
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(EXP)
      .sign(secret);

    return NextResponse.json({ token, user: payload });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
