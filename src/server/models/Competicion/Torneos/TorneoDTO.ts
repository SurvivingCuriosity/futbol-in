import { IConfigEnfrentamientos } from "../../Enfrentamiento/ConfigEnfrentamientos.model";
import { CompeticionBaseDTO } from "../CompeticionBase/CompeticionBaseDTO";

export interface TorneoDTO extends CompeticionBaseDTO {
  configEnfrentamientos: IConfigEnfrentamientos;
  enfrentamientos: string[];
}