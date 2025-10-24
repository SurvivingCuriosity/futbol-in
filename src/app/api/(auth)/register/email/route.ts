import { UserStatus } from "futbol-in-core/enum";
import { handleError } from "@/packages/utils/getErrorMessage";
import { RegistrationService } from "@/server/services/Auth/RegistrationService";
import { crearEmailSchema } from "@/server/validations/register/emailValidation";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

/**
 * Primer paso para el registro
 */

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    const {email:validatedEmail} = await crearEmailSchema.parseAsync({email});

    const idUsuario = await RegistrationService.registerByEmail(validatedEmail);

    return RegistrationService.createRegistrationResponse(idUsuario, UserStatus.MUST_CONFIRM_EMAIL);

  } catch (error: unknown) {
    console.error(error);
    return handleError(error);
  }
}
