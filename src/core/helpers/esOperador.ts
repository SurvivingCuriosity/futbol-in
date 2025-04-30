import { UserDTO } from "@/server/models/User/UserDTO";
import { UserRole } from "../enum/User/Role";

export const esOperador = (u:UserDTO) => {
    return u.role.includes(UserRole.OPERADOR)
}

export const cuentaOperadorIniciada = (u:UserDTO) => {
    return u.idOperador !== null
}