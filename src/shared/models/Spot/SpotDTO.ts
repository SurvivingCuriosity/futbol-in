import { TipoFutbolin } from "@/shared/enum/Futbolin/TipoFutbolin";
import { TipoLugar } from "@/shared/enum/Lugares/TipoLugar";

export interface SpotDTO {
  id: string;
  nombre: string;
  direccion: string;
  googlePlaceId: string;
  coordinates: [number, number];
  tipoLugar: TipoLugar;
  tipoFutbolin: TipoFutbolin;
  comentarios: string;
  verificado: null | {
    idUser: string;
    fechaVerificacion: Date;
  }
  votes: {
    up: string[];
    down: string[];
  }
}