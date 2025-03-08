import { UserStatus } from "@/shared/enum/User/Status";
import { errorResponse } from "@/shared/lib/httpResponse";
import { RegistrationService } from "@/shared/services/Auth/RegistrationService";

export async function POST(request: Request) {
  try {
    // Extraer cookie del token de registro
    const cookies = request.headers.get("cookie") || "";
    const token = getCookieValue(cookies, "registrationToken");
    if (!token) {
      return errorResponse("No token found", 401);
    }

    // Extraer username y password del body
    const { username, password } = await request.json()
    
    if (!username || !password) {
      return errorResponse("Faltan username o password", 400);
    }

    await RegistrationService.initializeAccount(token, username, password);

    return RegistrationService.createRegistrationResponse('', UserStatus.DONE);

  } catch (err: unknown) {
    return errorResponse(err);
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
