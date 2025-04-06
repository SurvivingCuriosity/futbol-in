import mongoose, { Schema } from "mongoose";

export interface EnfrentamientoDTO {
  competicion: string;
  partidos: string[];
  ganador: string;
}

export interface IEnfrentamiento extends mongoose.Document {
  competicion: mongoose.Types.ObjectId;
  partidos: mongoose.Types.ObjectId[];
  ganador: mongoose.Types.ObjectId;
}

export const EnfrentamientoSchema = new Schema({
  competicion: {
    type: Schema.Types.ObjectId,
    ref: 'Competicion',
    required: true
  },
  partidos: [{
    type: Schema.Types.ObjectId,
    ref: 'Partido'
  }],
  ganador: {
    type: Schema.Types.ObjectId,
    ref: 'Equipo',
    default: null
  }
}, {
  timestamps: true
});

const Enfrentamiento =
  mongoose.models.Enfrentamiento ||
  mongoose.model("Enfrentamiento", EnfrentamientoSchema);

export default Enfrentamiento;
