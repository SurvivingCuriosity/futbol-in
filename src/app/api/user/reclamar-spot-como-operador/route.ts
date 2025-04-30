import { ReclamarSpotComoOperadorRequest } from "@/client/shared/client/types/User/ReclamarSpotComoOperador";
import { reclamarSpotComoOperadorController } from "@/server/controllers/user/reclamarSpotComoOperadorController";
import { errorResponse, successResponse } from "@/server/lib/httpResponse";

export async function POST(req: Request) {
  try {
    const request: ReclamarSpotComoOperadorRequest = await req.json();

    const response = await reclamarSpotComoOperadorController(request);

    return successResponse(response, 200);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
