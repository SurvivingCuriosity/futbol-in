import { UserDTO } from "@/server/models/User/UserDTO";
import { UserRole } from "../enum/User/Role";

export const puedeCrearTorneos = (u: UserDTO) => {
  return u.role.includes(UserRole.CREA_TORNEOS);
};
