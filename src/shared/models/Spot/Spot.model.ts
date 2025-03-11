import mongoose, { Document, Model, ObjectId, Schema, Types } from "mongoose";
import { TipoFutbolin } from "../../enum/Futbolin/TipoFutbolin";
import { TipoLugar } from "../../enum/Lugares/TipoLugar";

export interface ISpot extends Document {
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
  addedByUserId: Types.ObjectId;

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
    addedByUserId: { type: Schema.Types.ObjectId, ref: "User", required: true },
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

const Spot: Model<ISpot> =
  mongoose.models.Spot || mongoose.model<ISpot>("Spot", SpotSchema);

export default Spot;
