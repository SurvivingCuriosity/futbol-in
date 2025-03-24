import { ConfigEnfrentamiento, ConfigEnfrentamientos } from "../FormSteps/Enfrentamientos/FormEnfrentamientos";

export interface ConfiguracionTorneoClasificatoria {
    cantidadParejas: number;
    configEnfrentamientosFaseDeGrupos: ConfigEnfrentamiento;
    configEnfrentamientosTorneo: ConfigEnfrentamientos;
}