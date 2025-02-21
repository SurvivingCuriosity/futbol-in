import connectDb from "@/shared/lib/db";
import { errorResponse, successResponse } from "@/shared/lib/httpResponse";
import { User } from "@/shared/models/User/User.model";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    await connectDb();

    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");

    if (!username) {
      return NextResponse.json(
        { error: "Falta el parámetro username" },
        { status: 400 }
      );
    }

    const userExists = await User.findOne({ name: username });
    const available = !userExists;

    return successResponse({ available });

  } catch (error: unknown) {
    return errorResponse(error);
  }
}
