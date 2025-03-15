import { getErrorMessage } from "@/packages/utils/getErrorMessage";
import { authOptions } from "@/server/lib/authOptions";
import { IUserDocument } from "@/server/models/User/User.model";
import { UserService } from "@/server/services/User/UserService";
import { getServerSession } from "next-auth";

export const validateLoggedInUser = async (): Promise<IUserDocument> => {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!user) {
      throw new Error("No sé encontró la sesión de usuario");
    }

    const userDb = await UserService.findById(user.id);

    if (!userDb) {
      throw new Error("No se encontró al usuario en la base de datos");
    }

    return userDb;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};
