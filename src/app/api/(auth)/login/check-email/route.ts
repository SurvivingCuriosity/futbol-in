import { errorResponse } from "@/server/lib/httpResponse";
import { RegistrationService } from "@/server/services/Auth/RegistrationService";
import { UserService } from "@/server/services/User/UserService";

export async function POST(request: Request) {
  try {
    const email = await request.json();

    if (!email) {
      return errorResponse("No existe un usuario con este email", 404);
    }

    const user = await UserService.findByEmail(email);

    if (!user) {
      return errorResponse("No existe un usuario con este email", 404);
    }

    const userDTO = UserService.mapToDTO(user);

    return RegistrationService.createRegistrationResponse(
      userDTO.id,
      userDTO.status,
      `/login/password?email=${encodeURIComponent(email)}`
    );
  } catch (error: unknown) {
    return errorResponse(error, 500);
  }
}
