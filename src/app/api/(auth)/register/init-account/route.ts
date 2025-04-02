import { UserStatus } from "@/core/enum/User/Status";
import { handleError } from "@/packages/utils/getErrorMessage";
import { RegistrationService } from "@/server/services/Auth/RegistrationService";
import { initAccountSchema } from "@/server/validations/register/initAccountValidation";

export async function POST(request: Request) {
  try {
    // Extraer cookie del token de registro
    const cookies = request.headers.get("cookie") || "";
    const token = getCookieValue(cookies, "registrationToken");
    if (!token) {
      return handleError("No token found");
    }

    const req = await request.json()
    console.log(req)
    const validatedReq = await initAccountSchema.parseAsync(req);
  
    const {username,password} = validatedReq;

    await RegistrationService.initializeAccount(token, username, password);

    return RegistrationService.createRegistrationResponse('', UserStatus.DONE);

  } catch (err: unknown) {
    return handleError(err);
  }
}

/**
 * Helper para extraer el valor de una cookie a partir del header.
 * @param cookieHeader El header completo de cookies.
 * @param name Nombre de la cookie a buscar.
 * @returns El valor de la cookie o null si no se encuentra.
 */
function getCookieValue(cookieHeader: string, name: string): string | null {
  const match = cookieHeader.match(new RegExp("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)"));
  return match ? match[2] : null;
}
