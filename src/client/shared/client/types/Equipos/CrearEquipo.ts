import { EquipoDTO } from "futbol-in-core/types";

export type CrearEquipoRequest = Omit<EquipoDTO, 'id'| 'createdByUserId'>

export interface CrearEquipoResponse {
  success: boolean;
  equipo: EquipoDTO;
}