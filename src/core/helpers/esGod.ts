import { UserDTO } from "@/server/models/User/UserDTO";
import { UserRole } from "../enum/User/Role";

export const esGod = (u:UserDTO) => {
    return u.role.includes(UserRole.GOD)
}