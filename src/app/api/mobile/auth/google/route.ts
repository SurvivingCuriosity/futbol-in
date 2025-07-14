import { NextRequest, NextResponse } from "next/server";
import { OAuth2Client } from "google-auth-library";
import { encode } from "next-auth/jwt";
import { authOptions } from "@/server/lib/authOptions";
import { UserService } from "@/server/services/User/UserService";
import { UserRole, UserStatus, AuthProvider } from "futbol-in-core/enum";

const client = new OAuth2Client(process.env.GOOGLE_MOBILE_CLIENT_ID);

export async function POST(req: NextRequest) {
  try {
    /* 1. Recibimos el id_token que nos envía la app */
    const { idToken } = (await req.json()) as { idToken?: string };

    if (!idToken) {
      return NextResponse.json({ error: "idToken requerido" }, { status: 400 });
    }

    /* 2. Verificamos la firma y obtenemos payload */
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_MOBILE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    if (!payload?.email) {
      return NextResponse.json({ error: "Token inválido" }, { status: 401 });
    }

    /* 3. Buscar o crear usuario como ya haces en el callback signIn */
    let user = await UserService.findByEmail(payload.email);
    if (!user) {
      user = await UserService.createGoogleUser(payload.email);
    }

    /* 4. Firmar nuestro JWT interno */
    const jwtPayload = {
      id: user._id.toString(),
      status: user.status as UserStatus,
      role: user.role || [UserRole.USER],
      email: user.email,
      name: user.name,
      provider: AuthProvider.GOOGLE,
      imagen: user.imagen || payload.picture || "",
    };

    const token = await encode({
      token: jwtPayload,
      secret: process.env.NEXTAUTH_SECRET!,
      maxAge: authOptions.session?.maxAge ?? 60 * 60 * 24 * 30,
    });

    return NextResponse.json({ token });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
