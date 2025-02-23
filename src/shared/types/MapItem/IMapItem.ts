import { TipoFutbolin } from "@/shared/enum/Futbolin/TipoFutbolin";
import { TipoLugar } from "@/shared/enum/Lugares/TipoLugar";

export interface IMapItem {
    nombre: string,
    direccion: string,
    lat: number,
    lng: number,
    googlePlaceId: string,
    tipoLugar: TipoLugar,
    tipoFutbolin: TipoFutbolin,
    comentarios: string,
}