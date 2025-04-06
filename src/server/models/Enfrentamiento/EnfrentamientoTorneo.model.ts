import mongoose, { Schema } from "mongoose";

export interface EnfrentamientoTorneoDTO {
  competicion: string;
  partidos: string[];
  equipo1Previa: string;
  equipo2Previa: string;
  equipo1Siguiente: string;
  equipo2Siguiente: string;
  ganador: string;
}

export interface IEnfrentamientoTorneo extends mongoose.Document {
  competicion: mongoose.Types.ObjectId;
  partidos: mongoose.Types.ObjectId[];
  equipo1Previa: mongoose.Types.ObjectId;
  equipo2Previa: mongoose.Types.ObjectId;
  equipo1Siguiente: mongoose.Types.ObjectId;
  equipo2Siguiente: mongoose.Types.ObjectId;
  ganador: mongoose.Types.ObjectId;
}

export const EnfrentamientoTorneoSchema = new Schema({
  competicion: {
    type: Schema.Types.ObjectId,
    ref: 'Competicion',
    required: true
  },
  partidos: [{
    type: Schema.Types.ObjectId,
    ref: 'Partido'
  }],
  equipo1Previa: {
    type: Schema.Types.ObjectId,
    ref: 'Enfrentamiento',
    default: null
  },
  equipo2Previa: {
    type: Schema.Types.ObjectId,
    ref: 'Enfrentamiento',
    default: null
  },
  equipo1Siguiente: {
    type: Schema.Types.ObjectId,
    ref: 'Enfrentamiento',
    default: null
  },
  equipo2Siguiente: {
    type: Schema.Types.ObjectId,
    ref: 'Enfrentamiento',
    default: null
  },
  ganador: {
    type: Schema.Types.ObjectId,
    ref: 'Equipo',
    default: null
  }
}, {
  timestamps: true
});

const EnfrentamientoTorneo =
  mongoose.models.Enfrentamiento ||
  mongoose.model("EnfrentamientoTorneo", EnfrentamientoTorneoSchema);

export default EnfrentamientoTorneo;
