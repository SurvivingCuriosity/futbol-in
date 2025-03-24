import mongoose, { Schema } from "mongoose";

const JugadorSchema = new Schema({
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    default: null,
  },
  // Nombre del jugador en caso de que no sea un usuario registrado
  nombre: {
    type: String,
    required: false,
    default: null,
  },
});

const EquipoSchema = new Schema(
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Equipo", EquipoSchema);
