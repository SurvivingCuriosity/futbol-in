import { UserDTO } from "@/server/models/User/UserDTO";

export type UpdateUserRequest = Partial<UserDTO>;

export interface UpdateUserResponse {
    success: boolean;
    updatedUser: UserDTO|null;
}