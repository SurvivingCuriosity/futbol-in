import { DistribucionFutbolin } from "@/core/enum/Futbolin/DistribucionFutbolin";
import { TipoFutbolin } from "@/core/enum/Futbolin/TipoFutbolin";
import { TipoLugar } from "@/core/enum/Lugares/TipoLugar";

export interface SpotDTO {
  id: string;
  nombre: string;
  direccion: string;
  ciudad: string;
  googlePlaceId: string;
  coordinates: [number, number];
  tipoLugar: TipoLugar;
  tipoFutbolin: TipoFutbolin;
  distribucion: DistribucionFutbolin;
  comentarios: string;
  addedByUserId: string;
  verificado: null | {
    correcto: boolean;
    idUser: string;
    fechaVerificacion: Date;
  }
  votes: {
    up: string[];
    down: string[];
  }
}