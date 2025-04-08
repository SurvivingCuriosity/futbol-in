import mongoose, { Model, Schema, Types } from "mongoose";
import { IPartido, PartidoDTO } from "../Partido/Partido.model";

export interface EnfrentamientoDTO {
  id: string;
  competicion: string;
  equipoA: string;
  equipoB: string;
  partidos: PartidoDTO[];
  ganador: string|null;
  jugado: boolean;
}

export interface IEnfrentamiento {
  id: string;
  competicion: mongoose.Types.ObjectId;
  equipoA: mongoose.Types.ObjectId;
  equipoB: mongoose.Types.ObjectId;
  partidos: Array<Types.ObjectId | IPartido>; 
  ganador: mongoose.Types.ObjectId|null;
  jugado: boolean;
}

export const EnfrentamientoSchema = new Schema<IEnfrentamiento>(
  {
    competicion: {
      type: Schema.Types.ObjectId,
      ref: "Competicion",
      required: true,
    },
    equipoA: {
      type: Schema.Types.ObjectId,
      ref: "Equipo",
      required: true,
    },
    equipoB: {
      type: Schema.Types.ObjectId,
      ref: "Equipo",
      required: true,
    },
    partidos: [
      {
        type: Schema.Types.ObjectId,
        ref: "Partido",
      },
    ],
    ganador: {
      type: Schema.Types.ObjectId,
      ref: "Equipo",
      default: null,
    },
    jugado: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Enfrentamiento: Model<IEnfrentamiento> =
  mongoose.models.Enfrentamiento || mongoose.model<IEnfrentamiento>("Enfrentamiento", EnfrentamientoSchema);

export default Enfrentamiento;
