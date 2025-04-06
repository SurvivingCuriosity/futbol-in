import {
  ConfigEnfrentamiento,
  ConfigEnfrentamientos,
} from "../../../common/Enfrentamientos/FormEnfrentamientos";

export interface ConfiguracionTorneoClasificatoria {
  cantidadParejas: number;
  configEnfrentamientosFaseDeGrupos: ConfigEnfrentamiento;
  configEnfrentamientosTorneo: ConfigEnfrentamientos;
}
