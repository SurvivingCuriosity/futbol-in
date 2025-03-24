import mongoose, { Document, Model, Schema, Types } from "mongoose";
import { TipoCompeticion } from "@/core/enum/Competicion/TipoCompeticion";
import { ModalidadJuego } from "@/core/enum/Competicion/ModalidadJuego";
import { TipoFutbolin } from "@/core/enum/Futbolin/TipoFutbolin";

const ConfigEnfrentamientoSchema = new Schema(
  {
    cantidadPartidos: { type: Number, required: false },
    golesParaGanar: { type: Number, required: false },
  },
  { _id: false }
);

const ConfigEnfrentamientosSchema = new Schema(
  {
    cantidadPartidos: { type: Number, required: false },
    golesParaGanar: { type: Number, required: false },
    excepcionSemiFinales: { type: ConfigEnfrentamientoSchema, default: null },
    excepcionFinal: { type: ConfigEnfrentamientoSchema, default: null },
  },
  { _id: false }
);

export interface ICompeticion extends Document {
  _id: Types.ObjectId;
  nombre: string;
  descripcion: string;
  googlePlaceId: string;
  tipoDeCompeticion: TipoCompeticion;
  tipoDeFutbolin: TipoFutbolin;
  modalidadDeJuego: ModalidadJuego;
  cantidadParejas: number;
  enfrentamientos: Types.ObjectId[];
  equipos: Types.ObjectId[];
  configuracionEnfrentamientos: {
    cantidadPartidos: number;
    golesParaGanar: number;
    excepcionSemiFinales: null | { cantidadPartidos: number; golesParaGanar: number };
    excepcionFinal: null | { cantidadPartidos: number; golesParaGanar: number };
  };
  createdByUserId: Types.ObjectId;
}

const CompeticionSchema: Schema<ICompeticion> = new Schema(
  {
    nombre: { type: String, required: false },
    descripcion: { type: String },
    googlePlaceId: { type: String, required: false },
    tipoDeCompeticion: {
      type: String,
      enum: Object.values(TipoCompeticion),
      required: false,
    },
    tipoDeFutbolin: {
      type: String,
      enum: Object.values(TipoFutbolin),
      required: false,
    },
    modalidadDeJuego: {
      type: String,
      enum: Object.values(ModalidadJuego),
      required: false,
    },
    cantidadParejas: { type: Number, required: false, default: null },
    enfrentamientos: [{ type: Schema.Types.ObjectId, ref: "Enfrentamiento" }],
    equipos: [{ type: Schema.Types.ObjectId, ref: "Equipo" }],
    configuracionEnfrentamientos: {
      type: ConfigEnfrentamientosSchema,
      required: false,
    },
    createdByUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  { timestamps: true }
);

const Competicion: Model<ICompeticion> =
  mongoose.models.Competicion ||
  mongoose.model<ICompeticion>("Competicion", CompeticionSchema);

export default Competicion;
