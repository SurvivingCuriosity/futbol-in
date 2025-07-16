import { NextRequest, NextResponse } from "next/server";
import { OAuth2Client } from "google-auth-library";
import { SignJWT } from "jose";
import { UserService } from "@/server/services/User/UserService";
import { UserRole, UserStatus, AuthProvider } from "futbol-in-core/enum";
import { errorResponse } from "@/server/lib/httpResponse";

/* 30 días */
const EXP = 60 * 60 * 24 * 30;
const clientId = process.env.GOOGLE_MOBILE_CLIENT_ID!;
const jwtSecret = new TextEncoder().encode(process.env.JWT_MOBILE_SECRET!);
const googleClient = new OAuth2Client(clientId);

/** POST /api/mobile/auth/google */
export async function POST(req: NextRequest) {
  try {
    /* ---------- 1. Body del cliente ---------- */
    const { code, codeVerifier, redirectUri } = (await req.json()) as {
      code?: string;
      codeVerifier?: string;
      redirectUri?: string;
    };

    if (!code || !codeVerifier || !redirectUri) {
      return errorResponse("code, codeVerifier y redirectUri requeridos", 400);
    }

    /* ---------- 2. code -> tokens (PKCE) ---------- */
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        code,
        code_verifier: codeVerifier,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    if (!tokenRes.ok) {
      const err = await tokenRes.json();
      console.error("Google token error", err);
      return errorResponse("Intercambio code falló", 400);
    }

    const { id_token: idToken } = (await tokenRes.json()) as {
      id_token: string;
    };

    /* ---------- 3. Verificar ID Token ---------- */
    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: clientId,
    });
    const g = ticket.getPayload();
    if (!g?.email) return errorResponse("Token inválido", 401);

    /* ---------- 4. Usuario en tu BD ---------- */
    let user = await UserService.findByEmail(g.email);
    if (!user) user = await UserService.createGoogleUser(g.email);

    const payload = {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role || [UserRole.USER],
      status: user.status as UserStatus,
      provider: AuthProvider.GOOGLE,
      imagen: user.imagen || g.picture || "",
    };

    /* ---------- 5. JWT HS256 propio ---------- */
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(EXP)
      .sign(jwtSecret);

    return NextResponse.json({ token, user: payload });
  } catch (e) {
    console.error(e);
    return errorResponse("Error interno", 500);
  }
}

export const dynamic = "force-dynamic";
