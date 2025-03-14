import {
  CambiarEmailResponse
} from "@/client/shared/client/types/User/CambiarEmail";
import { UserStatus } from "@/core/enum/User/Status";
import { authOptions } from "@/server/lib/authOptions";
import connectDb from "@/server/lib/db";
import { errorResponse, successResponse } from "@/server/lib/httpResponse";
import { MailService } from "@/server/services/Mail/MailService";
import { UserService } from "@/server/services/User/UserService";
import { getServerSession } from "next-auth";

export async function PUT(req: Request) {
  try {
    // Obtener sesión del usuario autenticado
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return errorResponse("No autorizado", 401);
    }

    // Extraer datos del body
    const request = await req.json();
    const { password, nuevoEmail } = request.req;

    if (!password || !nuevoEmail) {
      return errorResponse("Todos los campos son obligatorios", 400);
    }

    await connectDb();

    // Buscar usuario actual por email de sesión
    const user = await UserService.findByEmail(session.user.email);
    if (!user) {
      return errorResponse("Usuario no encontrado", 404);
    }

    // Verificar contraseña
    const isPasswordValid = await UserService.validatePassword(
      password,
      user.password ?? ""
    );
    if (!isPasswordValid) {
      return errorResponse("Contraseña incorrecta", 401);
    }

    // Verificar que el nuevo email no esté en uso
    const existingUser = await UserService.findByEmail(nuevoEmail);
    if (existingUser) {
      return errorResponse("El email ya está en uso", 400);
    }

    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() + 15);
    user.email = nuevoEmail;
    user.status = UserStatus.MUST_CONFIRM_EMAIL;
    user.verificationCode = verificationCode;
    user.verificationCodeExpires = expirationDate;
    await user.save();

    await MailService.sendVerificationEmail(nuevoEmail, verificationCode);

    const response: CambiarEmailResponse = {
      success: true,
    };

    return successResponse(response, 200);
  } catch (error) {
    console.error("Error al cambiar el email:", error);
    return errorResponse("Error interno del servidor", 500);
  }
}
