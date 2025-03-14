import { errorResponse, successResponse } from "@/server/lib/httpResponse";
import { UserService } from "@/server/services/User/UserService";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");

    if (!username) {
      return NextResponse.json(
        { error: "Falta el parámetro username" },
        { status: 400 }
      );
    }

    const userExists = await UserService.findByUsername(username);
    const available = !userExists;

    return successResponse({ available });

  } catch (error: unknown) {
    return errorResponse(error);
  }
}
