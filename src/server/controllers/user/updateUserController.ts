import { UpdateUserRequest, UpdateUserResponse } from "@/client/shared/client/types/User/UpdateUser";
import { UserService } from "@/server/services/User/UserService";
import { validateLoggedInUser } from "@/server/validations/shared/validateLoggedInUser";
import { updateUserSchema } from "@/server/validations/user/updateUserValidation";

export async function updateUserController(
  data: UpdateUserRequest
): Promise<UpdateUserResponse> {
  // Validar usuario que realiza la peticion
  const userDb = await validateLoggedInUser();

  // Validar request
  updateUserSchema.parse(data);

  // Actualización del spot
  const updatedUser = await UserService.updateUser(userDb.id, data);

  if(!updatedUser){
    return {
      success: false,
      updatedUser: null,
    };
  }


  return {
    updatedUser: UserService.mapToDTO(updatedUser),
    success: true,
  };
}
