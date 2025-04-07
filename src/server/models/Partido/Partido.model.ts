import mongoose, { Schema } from "mongoose";

export interface PartidoDTO {
  enfrentamiento: string;
  equipoA: string;
  equipoB: string;
  golesEquipoA: number;
  golesEquipoB: number;
  finalizado: boolean;
  ganador: string | null;
}

export interface IPartido extends mongoose.Document {
  enfrentamiento: mongoose.Types.ObjectId;
  equipoA: mongoose.Types.ObjectId;
  equipoB: mongoose.Types.ObjectId;
  golesEquipoA: number;
  golesEquipoB: number;
  finalizado: boolean;
  ganador: mongoose.Types.ObjectId | null;
}

const PartidoSchema = new Schema({
  enfrentamiento: {
    type: Schema.Types.ObjectId,
    ref: 'Enfrentamiento',
    required: true
  },
  equipoA: {
    type: Schema.Types.ObjectId,
    ref: 'Equipo',
    required: true
  },
  equipoB: {
    type: Schema.Types.ObjectId,
    ref: 'Equipo',
    required: true
  },
  golesEquipoA: Number,
  golesEquipoB: Number,
  finalizado: {
    type: Boolean,
    default: false
  },
  ganador: {
    type: Schema.Types.ObjectId,
    ref: 'Equipo',
    default: null
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Partido', PartidoSchema);
