import { EstadoCompeticion } from "futbol-in-core/enum";
import { ModalidadJuego } from "futbol-in-core/enum";
import { TipoInscripcion } from "futbol-in-core/enum";
import { TipoFutbolin } from "futbol-in-core/enum";
import mongoose, { Document, Model, Schema, Types } from "mongoose";
import { EquipoCompeticionSchema } from '../../Equipo/EquipoCompeticion.model';
import { TipoCompeticion } from "futbol-in-core/enum";
import { IEquipoCompeticion } from "futbol-in-core/types";

export interface ICompeticionBase extends Document {
  _id: Types.ObjectId;
  nombre: string;
  descripcion: string;
  ciudad: string;
  googlePlaceId: string;
  tipoCompeticion: TipoCompeticion;
  tipoDeFutbolin: TipoFutbolin;
  modalidadDeJuego: ModalidadJuego
  tipoInscripcion: TipoInscripcion;
  estadoCompeticion: EstadoCompeticion;
  equipos: Array<IEquipoCompeticion>;
  cantidadParejas: number;
  createdByUserId: Types.ObjectId;
}

const options = {
  discriminatorKey: "tipoDeCompeticion",
  collection: "competiciones",
  timestamps: true,
};

const BaseCompeticionSchema = new Schema<ICompeticionBase>(
  {
    nombre: { type: String, required: true },
    descripcion: { type: String },
    ciudad: { type: String, required: true },
    googlePlaceId: { type: String },
    tipoCompeticion: {
      type: String,
      enum: Object.values(TipoCompeticion),
      required: true,
      default: TipoCompeticion.LIGA,
    },
    tipoDeFutbolin: {
      type: String,
      enum: Object.values(TipoFutbolin),
      required: true,
    },
    modalidadDeJuego: {
      type: String,
      enum: Object.values(ModalidadJuego),
      required: true,
    },
    tipoInscripcion: {
      type: String,
      enum: Object.values(TipoInscripcion),
      required: true,
    },
    estadoCompeticion: {
      type: String,
      enum: Object.values(EstadoCompeticion),
      required: true,
    },
    createdByUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    equipos: [EquipoCompeticionSchema],
    cantidadParejas: { type: Number, required: false, default: null },
  },
  options,
);

// Este es el modelo base
export const CompeticionBase: Model<ICompeticionBase> =
  mongoose.models.CompeticionBase ||
  mongoose.model<ICompeticionBase>("CompeticionBase", BaseCompeticionSchema);
