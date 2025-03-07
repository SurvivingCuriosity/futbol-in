import mongoose, { Document, Model, ObjectId, Schema, Types } from "mongoose";
import { TipoFutbolin } from "../../enum/Futbolin/TipoFutbolin";
import { TipoLugar } from "../../enum/Lugares/TipoLugar";

export interface ILugar extends Document {
  _id: Types.ObjectId;
  nombre: string;
  direccion: string;
  googlePlaceId: string;
  location: {
    type: string;
    coordinates: [number, number];
  };
  tipoLugar: TipoLugar;
  tipoFutbolin: TipoFutbolin;
  comentarios: string;

  verificado: null | {
    correcto: boolean;
    idUser: ObjectId;
    fechaVerificacion: Date;
  };

  votes: {
    up: Types.ObjectId[];
    down: Types.ObjectId[];
  };
}

const LugarSchema: Schema<ILugar> = new Schema(
  {
    nombre: { type: String, required: true },
    direccion: { type: String, required: true },
    googlePlaceId: { type: String, required: true },
    location: {
      type: { type: String, enum: ["Point"], required: true },
      coordinates: { type: [Number], required: true },
    },
    tipoLugar: { type: String, enum: Object.values(TipoLugar), required: true },
    tipoFutbolin: {
      type: String,
      enum: Object.values(TipoFutbolin),
      required: true,
    },
    comentarios: { type: String },
    verificado: {
      type: {
        idUser: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        fechaVerificacion: { type: Date },
        correcto: { type: Boolean },
      },
      default: null,
    },
    votes: {
      up: [{ type: Schema.Types.ObjectId, ref: "User" }],
      down: [{ type: Schema.Types.ObjectId, ref: "User" }],
    },
  },
  { timestamps: true }
);

LugarSchema.index({ location: "2dsphere" });

const Lugar: Model<ILugar> =
  mongoose.models.Lugar || mongoose.model<ILugar>("Lugar", LugarSchema);

export default Lugar;
