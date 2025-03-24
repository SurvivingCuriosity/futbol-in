import mongoose, { Schema } from "mongoose";

const EnfrentamientoSchema = new Schema({
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
  },
  mejorDe: {
    type: Number,
    default: 1
  },
  golesParaGanar: {
    type: Number,
    default: 10
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Enfrentamiento', EnfrentamientoSchema);
