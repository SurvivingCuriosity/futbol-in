import { AuthProvider } from "@/shared/enum/User/AuthProvider";
import { UserRole } from "@/shared/enum/User/Role";
import { UserStatus } from "@/shared/enum/User/Status";
import { Schema, model, models } from "mongoose";

export interface IUser extends Document{
  name: string;
  email: string;
  password: string;
  imagen?: string;
  status?: UserStatus;
  role?: UserRole;
  provider: AuthProvider;
  createdAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    imagen: { type: String },
    status: {
      type: String,
      enum: Object.values(UserStatus),
      default: UserStatus.ACTIVE,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },
    provider: {
      type: String,
      enum: Object.values(AuthProvider),
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const User = models.User || model<IUser>("User", userSchema);
