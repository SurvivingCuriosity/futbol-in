import { IConfigEnfrentamiento } from "futbol-in-core/types";
import { Schema } from "mongoose";

export const ConfigEnfrentamientoSchema = new Schema(
  {
    cantidadPartidos: { type: Number, required: false },
    golesParaGanar: { type: Number, required: false },
  },
  { _id: false }
);

export interface IConfigEnfrentamientos extends IConfigEnfrentamiento {
  excepcionSemiFinales: null | IConfigEnfrentamiento;
  excepcionFinal: null | IConfigEnfrentamiento;
}

export const ConfigEnfrentamientosSchema = new Schema(
  {
    cantidadPartidos: { type: Number, required: false },
    golesParaGanar: { type: Number, required: false },
    excepcionSemiFinales: { type: ConfigEnfrentamientoSchema, default: null },
    excepcionFinal: { type: ConfigEnfrentamientoSchema, default: null },
  },
  { _id: false }
);
