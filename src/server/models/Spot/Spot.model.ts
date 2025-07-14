import { DistribucionFutbolin, TipoFutbolin, TipoLugar } from "futbol-in-core/enum"
import mongoose, { Document, Model, ObjectId, Schema, Types } from "mongoose";

export interface ISpot extends Document {
  _id: Types.ObjectId;
  nombre: string;
  direccion: string;
  googlePlaceId: string;
  ciudad: string;
  location: {
    type: string;
    coordinates: [number, number];
  };
  tipoLugar: TipoLugar;
  tipoFutbolin: TipoFutbolin;
  distribucion: DistribucionFutbolin;
  comentarios: string;
  addedByUserId: Types.ObjectId;
  idOperador: Types.ObjectId|null;

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
const SpotSchema: Schema<ISpot> = new Schema(
  {
    nombre: { type: String, required: true },
    direccion: { type: String, required: true },
    googlePlaceId: { type: String, required: true },
    ciudad: { type: String, required: true },
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
    distribucion: {
      type: String,
      enum: Object.values(DistribucionFutbolin),
      required: true,
    },
    comentarios: { type: String },
    addedByUserId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    idOperador: { type: Schema.Types.ObjectId, ref: "Operador", default: null, required: false },
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

SpotSchema.index({ location: "2dsphere" });
SpotSchema.index({ ciudad: "text" });

const Spot: Model<ISpot> =
  mongoose.models.Spot || mongoose.model<ISpot>("Spot", SpotSchema);

export default Spot;
