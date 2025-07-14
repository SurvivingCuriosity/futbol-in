import { TipoEnfrentamiento } from "futbol-in-core/enum";
import { ConfigEnfrentamiento } from "../FormSteps/Enfrentamientos/FormEnfrentamientos";

export interface ConfiguracionLiga {
  idaYVuelta: boolean;
  tipoEnfrentamiento: TipoEnfrentamiento;
  configEnfrentamiento: ConfigEnfrentamiento;
}
