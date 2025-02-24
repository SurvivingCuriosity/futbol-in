import { AuthProvider } from "@/shared/enum/User/AuthProvider";
import { UserRole } from "@/shared/enum/User/Role";
import { UserStatus } from "@/shared/enum/User/Status";
import { Document, Schema, Types, model, models } from "mongoose";

export interface IUserDocument extends Document {
  _id: Types.ObjectId;
  name?: string;
  email: string;
  password?: string;
  imagen?: string;
  status?: UserStatus;
  role?: UserRole;
  provider: AuthProvider;
  createdAt?: Date;

  verificationCode?: string;
  verificationCodeExpires?: Date;
}

const userSchema = new Schema<IUserDocument>(
  {
    name: { type: String },
    email: { type: String, required: true },
    password: { type: String },
    imagen: { type: String },
    status: {
      type: String,
      enum: Object.values(UserStatus),
      default: UserStatus.MUST_CONFIRM_EMAIL,
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
    verificationCode: { type: String },
    verificationCodeExpires: { type: Date },
  },
  {
    timestamps: true,
  }
);

export const User = models.User || model<IUserDocument>("User", userSchema);
