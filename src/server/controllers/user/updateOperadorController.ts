import { ActualizarPerfilOperadorRequest, ActualizarPerfilOperadorResponse } from "@/client/shared/client/types/User/ActualizarPerfilOperador";
import { UserService } from "@/server/services/User/UserService";
import { validateLoggedInUser } from "@/server/validations/shared/validateLoggedInUser";
import { updateOperadorSchema } from "@/server/validations/user/updateOperadorValidation";

export async function updateOperadorController(
  req: ActualizarPerfilOperadorRequest
): Promise<ActualizarPerfilOperadorResponse> {
  
  const userDb = await validateLoggedInUser();

  if(userDb.idOperador?.toString() !== req.idOperador){
    throw new Error("No tienes permiso para editar este perfil de operador")
  }
  
  const validatedData = updateOperadorSchema.parse(req.data);

  const updatedOperador = await UserService.updateOperador(req.idOperador, validatedData);

  if(!updatedOperador){
    return {
      success: false,
      updatedOperador: null,
    };
  }

  return {
    updatedOperador: UserService.mapOperadorToDTO(updatedOperador),
    success: true,
  };
}
