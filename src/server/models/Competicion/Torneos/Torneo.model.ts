import { Schema } from "mongoose";
import { CompeticionBase, ICompeticionBase } from "../CompeticionBase/Competicion.model";
import { ConfigEnfrentamientosSchema, IConfigEnfrentamientos } from '../../Enfrentamiento/ConfigEnfrentamientos.model';
import { EnfrentamientoTorneoSchema, IEnfrentamientoTorneo } from "../../Enfrentamiento/EnfrentamientoTorneo.model";

export interface ITorneo extends ICompeticionBase {
  configEnfrentamientos: IConfigEnfrentamientos
  enfrentamientos: IEnfrentamientoTorneo[]
}

const TorneoSchema = new Schema<ITorneo>({
  configEnfrentamientos: ConfigEnfrentamientosSchema,
  enfrentamientos: [EnfrentamientoTorneoSchema]
});

if (!CompeticionBase.discriminators?.Torneo) {
  CompeticionBase.discriminator("Torneo", TorneoSchema);
}

export const Torneo = CompeticionBase.discriminators?.Torneo;
