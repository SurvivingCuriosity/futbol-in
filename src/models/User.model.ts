import { Schema, model, models } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true, // crea createdAt y updatedAt automáticamente
  }
);

const User = models.User || model<IUser>("User", userSchema);

export default User;
