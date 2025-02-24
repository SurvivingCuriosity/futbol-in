import { AuthProvider } from "@/shared/enum/User/AuthProvider";
import { UserRole } from "@/shared/enum/User/Role";
import { UserStatus } from "@/shared/enum/User/Status";

export interface UserDTO {
  id: string;
  name: string;
  email: string;
  imagen?: string;
  status: UserStatus;
  role: UserRole;
  provider: AuthProvider;
  createdAt?: Date;
}