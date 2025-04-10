import { TipoInscripcion } from "@/core/enum/Competicion/TipoInscripcion";

export interface ConfiguracionBasica {
  nombre: string;
  descripcion: string;
  googlePlaceId: string;
  tipoInscripcion: TipoInscripcion;
  ciudad: string;
}
