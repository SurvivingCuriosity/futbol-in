import { EstadoEquipoCompeticion } from "@/core/enum/Competicion/EstadoEquipoCompeticion";
import { Schema, Types } from "mongoose";

export interface EquipoCompeticionDTO {
  id: string;
  estado: EstadoEquipoCompeticion;
}

export interface IEquipoCompeticion {
  id: Types.ObjectId;
  estado: EstadoEquipoCompeticion;
}

export const EquipoCompeticionSchema = new Schema<IEquipoCompeticion>(
  {
    id: { type: Schema.Types.ObjectId, required: true },
    estado: {
      type: String,
      enum: Object.values(EstadoEquipoCompeticion),
      required: true,
    },
  },
  { _id: false }
);