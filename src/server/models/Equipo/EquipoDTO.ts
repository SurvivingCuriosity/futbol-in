export interface EquipoDTO {
  id: string;
  nombreEquipo: string;
  imagenEquipo: string;
  jugadores?: Array<{usuario:string|null, nombre:string}>;
  createdByUserId: string;
}