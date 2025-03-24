import mongoose, { Schema } from "mongoose";


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
