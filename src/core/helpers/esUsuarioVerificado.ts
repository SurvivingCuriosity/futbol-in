import { UserDTO } from "@/server/models/User/UserDTO";
import { UserRole } from "../enum/User/Role";

export const esUsuarioVerificado = (u:UserDTO) => {
    return u.role.includes(UserRole.VERIFICADO)
}