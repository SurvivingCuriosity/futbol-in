import { TipoFutbolin } from "@/shared/enum/Futbolin/TipoFutbolin";
import { TipoLugar } from "@/shared/enum/Lugares/TipoLugar";

export interface LugarDTO {
  nombre: string;
  direccion: string;
  googlePlaceId: string;
  location: {
    type: string;
    coordinates: [number, number];
  };
  tipoLugar: TipoLugar;
  tipoFutbolin: TipoFutbolin;
  comentarios: string;
}