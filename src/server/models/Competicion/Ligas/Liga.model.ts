import { Schema } from "mongoose";
import { ConfigEnfrentamientoSchema, IConfigEnfrentamiento } from '../../Enfrentamiento/ConfigEnfrentamientos.model';
import { EnfrentamientoSchema, IEnfrentamiento } from "../../Enfrentamiento/Enfrentamiento.model";
import { CompeticionBase, ICompeticionBase } from "../CompeticionBase/Competicion.model";

export interface ILiga extends ICompeticionBase {
  configEnfrentamiento: IConfigEnfrentamiento
  enfrentamientos: IEnfrentamiento[]
}

const LigaSchema = new Schema<ILiga>({
  configEnfrentamiento: ConfigEnfrentamientoSchema,
  enfrentamientos: [EnfrentamientoSchema]
});


if (!CompeticionBase.discriminators?.Liga) {
  CompeticionBase.discriminator("Liga", LigaSchema);
}

export const Liga = CompeticionBase.discriminators?.Liga;
