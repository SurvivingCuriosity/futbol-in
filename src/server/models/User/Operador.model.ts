import { TipoFutbolin } from "@/core/enum/Futbolin/TipoFutbolin";
import { Document, Schema, Types, model, models } from "mongoose";

export interface IOperadorDocument extends Document {
  _id: Types.ObjectId;
  usuarios: Types.ObjectId;
  bio: string;
  nombreComercial: string;
  telefonos: Array<{ persona: string; numero: string }>;
  ciudad: string;
  futbolines: TipoFutbolin[];
  logo: string;
  fondo: string;
  enlaces: string;
}

const operadorSchema = new Schema<IOperadorDocument>(
  {
    usuarios: [{ type: Schema.Types.ObjectId, ref: "User" }],
    nombreComercial: { type: String, required: true },
    bio: { type: String, required: false, default: "" },
    enlaces: [{ type: String, required: false, default: "" }],
    telefonos: [
      {
        persona: { type: String, required: true },
        numero: { type: String, required: true },
      },
    ],
    ciudad: { type: String, required: true },
    futbolines: [
      {
        type: String,
        enum: Object.values(TipoFutbolin),
        default: [],
      },
    ],
    logo: { type: String, default: "" },
    fondo: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

export const Operador =
  models.Operador || model<IOperadorDocument>("Operador", operadorSchema);
