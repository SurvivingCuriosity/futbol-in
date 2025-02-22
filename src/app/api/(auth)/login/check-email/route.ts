// /api/login/route.ts
import { NextResponse } from "next/server";
import connectDb from "@/shared/lib/db";
import { User } from "@/shared/models/User/User.model";
import { UserStatus } from "@/shared/enum/User/Status";
import { errorResponse } from "@/shared/lib/httpResponse";
import { generateRegistrationToken } from "@/shared/lib/authToken";

export async function POST(request: Request) {
  try {
    await connectDb();

    const { email } = await request.json();
    if (!email) {
      return NextResponse.json({ error: "No se introdujo email" }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse("No existe un usuario con este email", 404);
    }

    // Dependiendo del status, redirigimos a una página distinta
    switch (user.status) {
      case UserStatus.MUST_CONFIRM_EMAIL: {
        // 1) Generamos token
        const token = generateRegistrationToken(user._id.toString());

        // 2) Retornamos JSON con redirect, PERO set cookie
        const response = NextResponse.json({ redirect: "/register/confirm-email" });
        response.cookies.set("registrationToken", token, {
          httpOnly: true,
          maxAge: 60 * 60, // 1h, por ejemplo
          path: "/",
        });
        return response;
      }

      case UserStatus.MUST_INIT_ACCOUNT: {
        // Igual que arriba: generamos token y lo seteamos
        const token = generateRegistrationToken(user._id.toString());
        const response = NextResponse.json({ redirect: "/register/init-account" });
        response.cookies.set("registrationToken", token, {
          httpOnly: true,
          maxAge: 60 * 60,
          path: "/",
        });
        return response;
      }

      case UserStatus.DONE:
        // Si está DONE, ya puede meter contraseña => /login/password?email=...
        return NextResponse.json({
          redirect: `/login/password?email=${encodeURIComponent(email)}`,
        });

      default:
        // Manejo extra
        return NextResponse.json(
          { error: `Estado de usuario no manejado: ${user.status}` },
          { status: 400 }
        );
    }
  } catch (error: unknown) {
    return errorResponse(error, 500);
  }
}
