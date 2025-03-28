import { EstadoJugador } from "@/core/enum/Equipos/EstadoJugador";

export interface ResponderInvitacionRequest {
  idEquipo: string;
  idJugador: string;
  estado: EstadoJugador
}

export interface ResponderInvitacionResponse {
  success: boolean;
}