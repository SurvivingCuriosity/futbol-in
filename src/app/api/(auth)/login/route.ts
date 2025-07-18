import { UserStatus } from "futbol-in-core/enum";
import { errorResponse } from "@/server/lib/httpResponse";
import { RegistrationService } from "@/server/services/Auth/RegistrationService";
import { UserService } from "@/server/services/User/UserService";

export async function POST(request: Request) {
  try {

    const email = await request.json();

    if (!email) {
      return errorResponse("No se introdujo email", 400);
    }

    const existingUser = await UserService.findByEmail(email);

    if(!existingUser) {
      return errorResponse("No existe un usuario con ese email", 404);
    }

    return RegistrationService.createRegistrationResponse(
      existingUser._id.toString(),
      existingUser.status as UserStatus
    );
  } catch (error: unknown) {
    return errorResponse(error, 500);
  }
}
