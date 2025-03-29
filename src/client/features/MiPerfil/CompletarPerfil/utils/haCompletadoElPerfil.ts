import { UserDTO } from "@/server/models/User/UserDTO";

export const haCompletadoElPerfil = (user: UserDTO) => {
  return user.nombre!==null && user.telefono!==null && user.posicion!==null;
};