import { Document, Schema, Types, model, models } from "mongoose";

interface IJugador {
  usuario: Types.ObjectId | null;
  nombre: string;
}

export interface IEquipoDocument extends Document {
  _id: Types.ObjectId;
  nombreEquipo: string;
  imagenEquipo: string;
  jugadores: IJugador[];
  createdByUserId: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
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
  },
  {
    timestamps: true,
  }
);

export const Equipo = models.Equipo || model<IEquipoDocument>("Equipo", EquipoSchema);
