import { UserStatus } from "@/shared/enum/User/Status";
import { errorResponse } from "@/shared/lib/httpResponse";
import { RegistrationService } from "@/shared/services/Auth/RegistrationService";
import { UserService } from "@/shared/services/User/UserService";

export async function POST(request: Request) {
  try {
    console.log("entro");
    const email = await request.json();
    console.log(email);
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
