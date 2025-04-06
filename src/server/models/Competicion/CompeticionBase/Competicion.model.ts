import { EstadoCompeticion } from "@/core/enum/Competicion/EstadoCompeticion";
import { ModalidadJuego } from "@/core/enum/Competicion/ModalidadJuego";
import { TipoInscripcion } from "@/core/enum/Competicion/TipoInscripcion";
import { TipoFutbolin } from "@/core/enum/Futbolin/TipoFutbolin";
import mongoose, { Document, Model, Schema, Types } from "mongoose";
import { EquipoCompeticionSchema, IEquipoCompeticion } from '../../Equipo/EquipoCompeticion.model';

export interface ICompeticionBase extends Document {
  _id: Types.ObjectId;
  nombre: string;
  descripcion?: string;
  googlePlaceId?: string;
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
    googlePlaceId: { type: String },
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
