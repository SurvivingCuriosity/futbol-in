import { Posicion } from "@/core/enum/Posicion/Posicion";
import { AuthProvider } from "@/core/enum/User/AuthProvider";
import { UserRole } from "@/core/enum/User/Role";
import { UserStatus } from "@/core/enum/User/Status";
import { Document, Schema, Types, model, models } from "mongoose";

export interface IUserDocument extends Document {
  _id: Types.ObjectId;
  name?: string;
  email: string;
  password?: string;
  imagen: string;
  status?: UserStatus;
  role?: UserRole[];
  provider: AuthProvider;
  createdAt?: Date;

  verificationCode?: string;
  verificationCodeExpires?: Date;

  stats: {
    addedFutbolines: number;
    votedFutbolines: number;
    verifiedFutbolines: number;
  };

  equipos: Types.ObjectId[];

  nombre: string|undefined|null;
  telefono: string|undefined|null;
  posicion: Posicion|undefined|null;
  ciudad: string|undefined|null;
  ciudadActual: string|undefined|null;
}

const userSchema = new Schema<IUserDocument>(
  {
    name: { type: String },
    email: { type: String, required: true },
    password: { type: String },
    imagen: { type: String, default: "" },
    status: {
      type: String,
      enum: Object.values(UserStatus),
      default: UserStatus.MUST_CONFIRM_EMAIL,
    },
    role: {
      type: [String],
      enum: Object.values(UserRole),
      default: [UserRole.USER],
    },
    provider: {
      type: String,
      enum: Object.values(AuthProvider),
      required: true,
    },
    verificationCode: { type: String },
    verificationCodeExpires: { type: Date },

    stats: {
      addedFutbolines: { type: Number, default: 0 },
      votedFutbolines: { type: Number, default: 0 },
      verifiedFutbolines: { type: Number, default: 0 },
    },

    equipos: [{ type: Schema.Types.ObjectId, ref: "Equipo", default: [] }],
    nombre: { type: String, default: null },
    telefono: { type: String, default: null },
    posicion: { type: String, enum: Object.values(Posicion), default: null },
    ciudad: { type: String, default: null },
    ciudadActual: { type: String, default: null },
  },
  {
    timestamps: true,
  }
);

export const User = models.User || model<IUserDocument>("User", userSchema);
