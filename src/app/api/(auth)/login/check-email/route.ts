// /api/login/route.ts
import { errorResponse } from "@/shared/lib/httpResponse";
import { RegistrationService } from "@/shared/services/Auth/RegistrationService";
import { UserService } from "@/shared/services/User/UserService";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "No se introdujo email" },
        { status: 400 }
      );
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
