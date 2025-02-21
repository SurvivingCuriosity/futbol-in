// app/api/register/step2/route.ts
import { UserStatus } from "@/shared/enum/User/Status";
import { verifyRegistrationToken } from "@/shared/lib/authToken";
import connectDb from "@/shared/lib/db";
import {
  errorResponse,
  successResponse
} from "@/shared/lib/httpResponse";
import { User } from "@/shared/models/User/User.model";

export async function POST(request: Request) {
  try {
    await connectDb();

    // Leer cookie
    const cookies = request.headers.get("cookie") || "";
    const token = getCookieValue(cookies, "registrationToken");
    if (!token) {
      return errorResponse("No token found", 401);
    }

    const { code } = await request.json();
    if (!code) {
      return errorResponse("Falta el código de verificación", 400);
    }

    // Verificar token
    const payload = verifyRegistrationToken(token);

    // Cargar usuario
    const user = await User.findById(payload.userId);
    if (!user) {
      return errorResponse("Usuario no encontrado", 404);
    }
    if (user.status !== UserStatus.MUST_CONFIRM_EMAIL) {
      return errorResponse(`Estado incorrecto: ${user.status}`, 400);
    }

    // Verificar code
    if (user.verificationCode !== code) {
      return errorResponse("Código de verificación inválido", 400);
    }
    if (
      !user.verificationCodeExpires ||
      user.verificationCodeExpires < new Date()
    ) {
      return errorResponse("El código ha expirado", 400);
    }

    // Actualizar estado
    user.status = UserStatus.MUST_INIT_ACCOUNT;
    user.verificationCode = undefined;
    user.verificationCodeExpires = undefined;
    await user.save();

    return successResponse({ success: true });
  } catch (err: unknown) {
    return errorResponse(err);
  }
}

// Pequeña helper para extraer una cookie de la cabecera
function getCookieValue(cookieHeader: string, name: string): string | null {
  const match = cookieHeader.match(
    new RegExp("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")
  );
  return match ? match[2] : null;
}
