import { UserStatus } from "@/core/enum/User/Status";
import { errorResponse } from "@/server/lib/httpResponse";
import { RegistrationService } from "@/server/services/Auth/RegistrationService";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

/**
 * Primer paso para el registro
 */

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return errorResponse("El email es obligatorio", 400);
    }

    const idUsuario = await RegistrationService.registerByEmail(email);

    return RegistrationService.createRegistrationResponse(idUsuario, UserStatus.MUST_CONFIRM_EMAIL);

  } catch (error: unknown) {
    return errorResponse(error);
  }
}
