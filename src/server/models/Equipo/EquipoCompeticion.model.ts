import { EstadoEquipoCompeticion } from "futbol-in-core/enum";
import { IEquipoCompeticion } from "futbol-in-core/types";
import { Schema } from "mongoose";

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