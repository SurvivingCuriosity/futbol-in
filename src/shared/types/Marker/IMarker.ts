import { IMapItem } from "../MapItem/IMapItem";

export interface IMarker {
    id: number,
    lat: number,
    lng: number,
    iconUrl: string,
    data: IMapItem
}