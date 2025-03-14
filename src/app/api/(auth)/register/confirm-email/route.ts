import {
  errorResponse,
  successResponse
} from "@/server/lib/httpResponse";
import { RegistrationService } from "@/server/services/Auth/RegistrationService";

export async function POST(request: Request) {
  try {

    const cookies = request.headers.get("cookie") || "";
    const token = getCookieValue(cookies, "registrationToken");
    if (!token) {
      return errorResponse("No token found", 401);
    }

    const code  = await request.json();
    
    if (!code) {
      return errorResponse("Falta el código de verificación", 400);
    }

    await RegistrationService.verifyRegistrationCode(token, code);

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
