import { TipoFutbolin } from "@/core/enum/Futbolin/TipoFutbolin";
import { TipoLugar } from "@/core/enum/Lugares/TipoLugar";

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