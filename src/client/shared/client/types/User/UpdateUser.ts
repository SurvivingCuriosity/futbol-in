import { UserDTO } from "futbol-in-core/types";

export type UpdateUserRequest = Partial<UserDTO>;

export interface UpdateUserResponse {
    success: boolean;
    updatedUser: UserDTO|null;
}