import {
  CrearPerfilOperadorRequest,
  CrearPerfilOperadorResponse,
} from "@/client/shared/client/types/User/CrearPerfilOperador";
import { esOperador } from "@/core/helpers/esOperador";
import { UserService } from "@/server/services/User/UserService";
import { validateLoggedInUser } from "@/server/validations/shared/validateLoggedInUser";
import { crearPerfilOperadorSchema } from "@/server/validations/user/crearPerfilOperadorValidation";

export async function crearPerfilOperadorController(
  data: CrearPerfilOperadorRequest
): Promise<CrearPerfilOperadorResponse> {
  const userDb = await validateLoggedInUser();

  if (!esOperador(UserService.mapToDTO(userDb))) {
    throw new Error(
      "Debes tener una cuenta de operador para realizar esta operación"
    );
  }

  // Validar request
  const validatedPerfil = crearPerfilOperadorSchema.parse(data);

  // Actualización del spot
  const operadorCreado = await UserService.createPerfilOperador({
    operador:validatedPerfil,
    idUsuario: userDb.id
  });

  if (!operadorCreado) {
    return {
      success: false,
      idOperador: "",
    };
  }

  return {
    idOperador: operadorCreado.id,
    success: true,
  };
}
