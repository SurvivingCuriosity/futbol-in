import { IConfigEnfrentamiento } from "../../Enfrentamiento/ConfigEnfrentamientos.model";
import { CompeticionBaseDTO } from "../CompeticionBase/CompeticionBaseDTO";

export interface LigaDTO extends CompeticionBaseDTO {
  configEnfrentamiento: IConfigEnfrentamiento;
  enfrentamientos: string[];
}
