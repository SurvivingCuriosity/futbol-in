import { UpdateUserRequest } from "@/client/shared/client/types/User/UpdateUser";
import { updateUserController } from "@/server/controllers/user/updateUserController";
import { errorResponse, successResponse } from "@/server/lib/httpResponse";

export async function POST(req: Request) {
  try {
    const request: UpdateUserRequest = await req.json();

    const response = await updateUserController(request);

    return successResponse(response, 200);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
