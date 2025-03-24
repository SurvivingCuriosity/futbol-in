import { ConfigCompeticion } from "../FormSteps/Enfrentamientos/Enfrentamientos";

  export const getTextoEnfrentamientos = (configuracion:ConfigCompeticion) => {
    const { cantidadPartidos, golesParaGanar } = configuracion;
    const partido = cantidadPartidos === 1 ? "partido" : "partidos";
    return `Al mejor de ${cantidadPartidos} ${partido}. El partido se gana al llegar a ${golesParaGanar} goles`;
  };

  export const getTextoEnfrentamientosSemifinal = (excepcionSemiFinales:boolean, configuracion:ConfigCompeticion) => {
    if (!excepcionSemiFinales || !configuracion.excepcionSemiFinales) {
      return "";
    }
    const { cantidadPartidos, golesParaGanar } =
      configuracion.excepcionSemiFinales;
    const partido = cantidadPartidos === 1 ? "partido" : "partidos";
    return `Semifinales: Al mejor de ${cantidadPartidos} ${partido}. El partido se gana al llegar a ${golesParaGanar} goles`;
  };

  export const getTextoEnfrentamientosFinal = (excepcionFinal:boolean, configuracion:ConfigCompeticion) => {
    if (!excepcionFinal || !configuracion.excepcionFinal) {
      return "";
    }
    const { cantidadPartidos, golesParaGanar } = configuracion.excepcionFinal;
    const partido = cantidadPartidos === 1 ? "partido" : "partidos";
    return `Final: Al mejor de ${cantidadPartidos} ${partido}. El partido se gana al llegar a ${golesParaGanar} goles`;
  };