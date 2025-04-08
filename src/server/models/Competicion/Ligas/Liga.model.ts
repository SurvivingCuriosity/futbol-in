import { Schema, Types } from "mongoose";
import { ConfigEnfrentamientoSchema, IConfigEnfrentamiento } from '../../Enfrentamiento/ConfigEnfrentamientos.model';
import { CompeticionBase, ICompeticionBase } from "../CompeticionBase/Competicion.model";

export interface ILiga extends ICompeticionBase {
  idaYVuelta: boolean;
  configEnfrentamiento: IConfigEnfrentamiento
  enfrentamientos: Types.ObjectId[]
}

const LigaSchema = new Schema<ILiga>({
  idaYVuelta: { type: Boolean, required: true },
  configEnfrentamiento: ConfigEnfrentamientoSchema,
  enfrentamientos: [
    {
      type: Schema.Types.ObjectId,
      ref: "Enfrentamiento",
    },
  ]
});


if (!CompeticionBase.discriminators?.Liga) {
  CompeticionBase.discriminator("Liga", LigaSchema);
}

export const Liga = CompeticionBase.discriminators?.Liga;
