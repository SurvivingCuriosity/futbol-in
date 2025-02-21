import { UserStatus } from "@/shared/enum/User/Status";
import connectDb from "@/shared/lib/db";
import { errorResponse, successResponse } from "@/shared/lib/httpResponse";
import { User } from "@/shared/models/User/User.model";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  try {
    await connectDb();

    const { email } = await request.json();

    if (!email) {
      return errorResponse("No se introdujo email", 400);
    }

    // Ver si existe un usuario con ese email
    const existingUser = await User.findOne({ email });

    if (existingUser && existingUser.status === UserStatus.MUST_CONFIRM_EMAIL) {
      redirect("/register/confirm-email");
    }

    if (existingUser && existingUser.status === UserStatus.MUST_INIT_ACCOUNT) {
      redirect("/register/init-account");
    }

    return successResponse({ success: true });
  } catch (error: unknown) {
    return errorResponse(error, 500);
  }
}
