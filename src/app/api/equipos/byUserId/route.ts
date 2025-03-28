import { errorResponse, successResponse } from "@/server/lib/httpResponse";
import { EquipoService } from "@/server/services/Equipo/EquipoService";
import { UserService } from "@/server/services/User/UserService";

export async function POST(req: Request) {
  try {
    const idUser: string = await req.json();

    const user = await UserService.findById(idUser)

    if(!user){
      return errorResponse(new Error("No existe el usuario"))
    }

    const idsEquipos = user?.equipos

    const response = await EquipoService.findManyById(idsEquipos);

    return successResponse(response, 201);
  } catch (error) {
    return errorResponse(error);
  }
}
