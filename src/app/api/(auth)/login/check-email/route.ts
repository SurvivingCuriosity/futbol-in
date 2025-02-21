import { UserStatus } from "@/shared/enum/User/Status";
import connectDb from "@/shared/lib/db";
import { errorResponse } from "@/shared/lib/httpResponse";
import { User } from "@/shared/models/User/User.model";
import { NextResponse } from "next/server";

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
      case UserStatus.MUST_CONFIRM_EMAIL:
        return NextResponse.json({ redirect: "/register/step2" });
      case UserStatus.MUST_INIT_ACCOUNT:
        return NextResponse.json({ redirect: "/register/step3" });
      case UserStatus.DONE:
        // Si está "DONE", significa que ya puede meter su contraseña
        // Lo llevamos a /login/password con el email en la query
        return NextResponse.json({
          redirect: `/login/password?email=${encodeURIComponent(email)}`,
        });
      default:
        // Manejo extra si tienes más estados o un default
        return NextResponse.json(
          { error: `Estado de usuario no manejado: ${user.status}` },
          { status: 400 }
        );
    }
  } catch (error: unknown) {
    return errorResponse(error, 500);
  }
}
