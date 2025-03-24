import { TipoEnfrentamiento } from "@/core/enum/Competicion/TipoEnfrentamiento";
import { ConfigEnfrentamiento } from "../FormSteps/Enfrentamientos/FormEnfrentamientos";

export interface ConfiguracionLiga {
  idaYVuelta: boolean;
  tipoEnfrentamiento: TipoEnfrentamiento;
  configEnfrentamientos: ConfigEnfrentamiento
}