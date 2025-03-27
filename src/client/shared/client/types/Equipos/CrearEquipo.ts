import { EquipoDTO } from "@/server/models/Equipo/EquipoDTO";

export type CrearEquipoRequest = Omit<EquipoDTO, 'id'| 'createdByUserId'>

export interface CrearEquipoResponse {
  success: boolean;
  equipo: EquipoDTO;
}