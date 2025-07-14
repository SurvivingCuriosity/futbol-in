import { UserDTO } from "futbol-in-core/types";

export const haCompletadoElPerfil = (user: UserDTO) => {
  return user.nombre!==null && user.telefono!==null && user.posicion!==null && user.ciudad!==null && user.ciudadActual!==null;
};