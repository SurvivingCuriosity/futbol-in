import { EnfrentamientoDTO } from "@/server/models/Enfrentamiento/Enfrentamiento.model";
import { EquipoConEstadoDTO } from "@/server/models/Equipo/EquipoDTO";
import { PartidoDTO } from "@/server/models/Partido/Partido.model";

export const getPartidosDeEquipo = (
  equipo: EquipoConEstadoDTO,
  enfrentamientos: EnfrentamientoDTO[]
): EnfrentamientoDTO[] => {
  const enfrentamientosEquipo = enfrentamientos.filter(
    (e) => e.equipoA === equipo.id || e.equipoB === equipo.id
  );
  return enfrentamientosEquipo;
};

export const getPartidosTerminados = (
  enfrentamientos: EnfrentamientoDTO[]
): EnfrentamientoDTO[] => {
  const enfrentamientosTerminados = enfrentamientos.filter((e) => e.jugado);

  return enfrentamientosTerminados;
};

export const getPartidosJugados = (
  equipo: EquipoConEstadoDTO,
  enfrentamientos: EnfrentamientoDTO[]
): number => {
  const enfrentamientosEquipo = getPartidosDeEquipo(equipo, enfrentamientos);
  console.log('Enfrentmiantos del equipo', enfrentamientosEquipo)
  
  const enfrentamientosTerminados = getPartidosTerminados(
    enfrentamientosEquipo
  );
  console.log('Enfrentmiantos terminados', enfrentamientosTerminados)

  return enfrentamientosTerminados.length;
};

export const  getPartidosGanados = (
  equipo: EquipoConEstadoDTO,
  enfrentamientos: EnfrentamientoDTO[]
): number => {
  const enfrentamientosEquipo = getPartidosDeEquipo(equipo, enfrentamientos);

  const enfrentamientosTerminados = getPartidosTerminados(
    enfrentamientosEquipo
  );

  return enfrentamientosTerminados.filter(e => e.ganador === equipo.id).length;
};

export const getPartidosPerdidos = (
  equipo: EquipoConEstadoDTO,
  enfrentamientos: EnfrentamientoDTO[]
): number => {
  const enfrentamientosEquipo = getPartidosDeEquipo(equipo, enfrentamientos);
  const enfrentamientosTerminados = getPartidosTerminados(
    enfrentamientosEquipo
  );
  return enfrentamientosTerminados.filter(e => e.ganador !== equipo.id).length;
};


export const getGolesAFavor = (
  equipo: EquipoConEstadoDTO,
  enfrentamientos: EnfrentamientoDTO[]
): number => {
  return enfrentamientos.reduce((totalEnfrentamiento, enf) => {
    const golesEnEste = enf.partidos.reduce((sum, partido: PartidoDTO) => {
      if (partido.equipoA === equipo.id) {
        return sum + partido.golesEquipoA;
      }
      if (partido.equipoB === equipo.id) {
        return sum + partido.golesEquipoB;
      }
      return sum;
    }, 0);
    return totalEnfrentamiento + golesEnEste;
  }, 0);
};

export const getGolesEnContra = (
  equipo: EquipoConEstadoDTO,
  enfrentamientos: EnfrentamientoDTO[]
): number => {
  return enfrentamientos.reduce((totalEnfrentamiento, enf) => {
    const golesEnEste = enf.partidos.reduce((sum, partido: PartidoDTO) => {
      if (partido.equipoA === equipo.id) {
        return sum + partido.golesEquipoB;
      }
      if (partido.equipoB === equipo.id) {
        return sum + partido.golesEquipoA;
      }
      return sum;
    }, 0);
    return totalEnfrentamiento + golesEnEste;
  }, 0);
};
