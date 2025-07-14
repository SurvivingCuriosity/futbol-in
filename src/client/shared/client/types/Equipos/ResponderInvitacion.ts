import { EstadoJugador } from "futbol-in-core/enum";

export interface ResponderInvitacionRequest {
  idEquipo: string;
  idJugador: string;
  estado: EstadoJugador
}

export interface ResponderInvitacionResponse {
  success: boolean;
}