import { EstadoJugador } from "@/core/enum/Equipos/EstadoJugador";

export interface EquipoDTO {
  id: string;
  nombreEquipo: string;
  imagenEquipo: string;
  jugadores: Array<{usuario:string|null, nombre:string, estado:EstadoJugador}>;
  createdByUserId: string;
}