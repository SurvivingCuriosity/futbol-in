import { EstadoEquipoCompeticion } from "@/core/enum/Competicion/EstadoEquipoCompeticion";
import { EstadoJugador } from "@/core/enum/Equipos/EstadoJugador";
import { Document, Schema, Types, model, models } from "mongoose";

interface IJugador {
  usuario: Types.ObjectId | null;
  nombre: string;
  estado: EstadoJugador;
}

export interface IEquipoDocument extends Document {
  _id: Types.ObjectId;
  nombreEquipo: string;
  imagenEquipo: string;
  jugadores: IJugador[];
  createdByUserId: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
  estado: EstadoEquipoCompeticion;
}

const JugadorSchema = new Schema<IJugador>({
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    default: null,
  },
  nombre: {
    type: String,
    required: false,
    default: null,
  },
  estado: {
    type: String,
    enum: Object.values(EstadoJugador),
    required: false,
    default: EstadoJugador.PENDIENTE,
  },
});

const EquipoSchema = new Schema<IEquipoDocument>(
  {
    nombreEquipo: {
      type: String,
      required: false,
      default: null,
    },
    imagenEquipo: {
      type: String,
      required: false,
      default: null,
    },
    jugadores: {
      type: [JugadorSchema],
      default: [],
    },
    createdByUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    estado: {
      type: String,
      enum: Object.values(EstadoEquipoCompeticion),
      required: false,
      default: EstadoEquipoCompeticion.ACEPTADO,
    },
  },
  {
    timestamps: true,
  }
);

export const Equipo =
  models.Equipo || model<IEquipoDocument>("Equipo", EquipoSchema);
