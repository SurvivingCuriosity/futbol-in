import { TipoInscripcion } from "futbol-in-core/enum";

export interface ConfiguracionBasica {
  nombre: string;
  descripcion: string;
  googlePlaceId: string;
  tipoInscripcion: TipoInscripcion;
  ciudad: string;
}
